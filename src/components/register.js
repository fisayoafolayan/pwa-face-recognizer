
import React, { Component } from 'react';
import Webcam from 'react-webcam';
import '../styles/register.css';

import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { registerUser } from '../actions';

import UserRegister from './user-register';

// material-ui components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

// loader styling
const style = {
    container: {
        position: 'absolute',
    },
    refresh: {
        display: 'inline-block',
        position: 'absolute',
    },
    hide: {
        display: 'none',
        position: 'absolute',
    },
};

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            load: false
        };
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        this.setState({
            load: true
        });
        const imageSrc = this.webcam.getScreenshot();
        // console.log(imageSrc);
        axios.post(`https://api.kairos.com/enroll`, {
            gallery_name: 'fisayoGallery',
            image: imageSrc,
            subject_id: this.state.username
        }, {
                headers: {
                    app_id: '92ae697a',
                    app_key: '1c28bee6ed606aa4d846de6f49690620'
                }
            }).then((response) => {
                console.log(response);
                this.props.registerUser(response.data);
                this.setState({
                    load: false
                });
            });
    };

    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <div style={{ 'textAlign': 'center' }}>
                            <h3>REGISTER FACE</h3>
                            <Webcam
                                audio={false}
                                height={320}
                                ref={this.setRef}
                                screenshotFormat="image/png"
                                width={320}
                            />
                            <br />
                            <div style={{ 'margin': '0 auto!important' }}>
                                <TextField
                                    hintText="provide identification name"
                                    floatingLabelText="Username"
                                    onChange={(event) => this.handleUsername(event)}
                                />
                            </div>
                            <br />
                            <RefreshIndicator
                                className='css-loader'
                                size={80}
                                left={70}
                                top={0}
                                loadingColor="#ADD8E6"
                                status="loading"
                                style={(this.state.load === false) ? style.hide : style.refresh}
                            />
                            <br />
                            <RaisedButton className='register-button' onClick={this.capture} label="REGISTER" primary={true} style={{ 'margin': 16 }} />
                            <UserRegister detect={this.props.regData} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        regData: state.regData
    }
}

export default connect(mapStateToProps, { registerUser })(Register);