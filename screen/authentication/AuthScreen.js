import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { FONT } from '../../common/Theme';
import { callLogin, callSignup, getLocalAccessToken } from './AuthThunk';
import { logOut, setAuthMode } from './AuthSlice';
import { useNavigation } from '@react-navigation/native';
import { removeLocalStorage } from '../../common/LocalStorage';
import { KEY_LOCAL_TOKEN } from '../../common/Constant';

const AuthScreen = () => {
  const navigation = useNavigation();
  const bg_login = require('../../assets/images/bg_login.webp');
  const ic_fb = require('../../assets/images/facebook.png');
  const ic_gg = require('../../assets/images/google.png');
  const login = useSelector(state => state.auth.loginMode);
  const localToken = useSelector(state => state.auth.accessToken);
  const signupStatus = useSelector(state => state.auth.signupStatus)
  const dispatch = useDispatch();

  // Store data for login

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailPattern = '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/';

  // Store data for signup

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupPhone, setSignupPhone] = useState('')



  const onPressSignupText = () => {
    dispatch(setAuthMode(false));
  };

  const backtoLogin = () => {
    dispatch(setAuthMode(true));
  };

  const onPressLogin = () => {
    // if(loginInfo.email.match(emailPattern) && loginInfo.password != "") {
    //     dispatch(callLogin(loginInfo))
    // }
    const loginInfo = {
      email,
      password
    }
    console.log(loginInfo)
    dispatch(callLogin(loginInfo));
  };

  const checkLogin = () => {
    if (localToken == undefined || localToken == '') {
      console.log('Currently not logged in');
    } else {
      console.log(`token from local: ${localToken}`)
      navigation.navigate('AnimateTab');
    }
  };

  //For signup

  const onPressSignUp = () => {
    const signUpInfo = {
      email: signupEmail,
      password: signupPassword,
      name: signupName,
      phone: signupPhone
    }
    console.log(signUpInfo)
    dispatch(callSignup(signUpInfo))


  };

  useEffect(() => {
    dispatch(getLocalAccessToken());
    checkLogin();

  }, [localToken]);

  useEffect(() => {
    //If signup successful then login automatically
    if (signupStatus) {
      dispatch(callLogin({ email: signupEmail, password: signupPassword }))
    }

  }, [signupStatus])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled={false}>
      <View style={{ flex: 1 }}>
        <Image source={bg_login} style={styles.img_login} resizeMode="cover" />
      </View>
      <LinearGradient
        style={styles.gradient_container}
        colors={['transparent', '#1B1517', '#000']}>
        {!login && (
          <TouchableOpacity onPress={() => backtoLogin()} style={{ position: 'absolute', top: "5%", left: "5%" }}>
            <FontAwesomeIcon icon={faArrowLeft} color="#FFF" size={24} />
          </TouchableOpacity>
        )}

        <View style={styles.input_container}>
          {login ? (
            <>
              <Text style={styles.title_text}>Log in</Text>

              <TextInput
                style={styles.input_field}
                placeholder="Email"
                autoCapitalize='none'
                onChangeText={(email) => setEmail(email)}

              />
              <TextInput
                style={styles.input_field}
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity
                style={styles.btn_authen}
                onPress={() => onPressLogin()}>
                <Text style={styles.btn_authen_text}>Continue</Text>
              </TouchableOpacity>
              <Text style={styles.or_text}>Or</Text>
              <TouchableOpacity style={styles.btn_socialLogin}>
                <Image source={ic_gg} style={styles.icon} />
                <Text style={styles.btn_socialLogin_text}>
                  Continue with Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn_socialLogin}>
                <Image source={ic_fb} style={styles.icon} />
                <Text style={styles.btn_socialLogin_text}>
                  Continue with FaceBook
                </Text>
              </TouchableOpacity>

              <View style={styles.footer_signup}>
                <Text style={styles.footer_text}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => onPressSignupText()}>
                  <Text style={styles.footer_textTouch}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={[styles.footer_textTouch, { alignSelf: 'center' }]}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title_text}>Sign up</Text>
              <TextInput
                style={styles.input_field}
                placeholder="Email"
                onChangeText={data => setSignupEmail(data)}
                autoCapitalize='none'
              />
              <TextInput
                style={styles.input_field}
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry
                onChangeText={data => setSignupPassword(data)}
              />

              <TextInput
                style={styles.input_field}
                placeholder="Name"
                onChangeText={data => setSignupName(data)}
              />
              <TextInput
                style={styles.input_field}
                placeholder="Phone"
                onChangeText={data => setSignupPhone(data)}
              />
              <TouchableOpacity style={styles.btn_authen} onPress={() => onPressSignUp()}>
                <Text style={styles.btn_authen_text}>Agree & Continue</Text>
              </TouchableOpacity>

              <View style={styles.footer_signup_clicked}>
                <Text style={styles.footer_text}>
                  By selecting Agree & Continue, I agree to
                </Text>
                <TouchableOpacity onPress={() => { }}>
                  <Text style={styles.footer_textTouch}>
                    Term of Service and Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text style={styles.footer_text}>
                  Already a member?
                </Text>
                <TouchableOpacity onPress={() => backtoLogin()}>
                  <Text style={styles.footer_textTouch}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  img_login: {
    width: '100%',
    height: '100%',
  },

  gradient_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: 16,
  },

  input_container: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    backgroundColor: 'rgba(45, 43, 44, 0.7)',
    borderRadius: 10,
    bottom: 32,
    marginHorizontal: 16,
    paddingHorizontal: 32,
  },

  input_field: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    marginBottom: 12,
    padding: 8
  },

  title_text: {
    fontFamily: FONT.semiBold,
    fontSize: 24,
    bottom: 16,
    color: 'white',
    marginTop: 24,
  },

  btn_authen: {
    height: 40,
    backgroundColor: '#03D396',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  btn_authen_text: {
    color: 'white',
    fontFamily: FONT.medium,
    fontSize: 15,
  },

  btn_socialLogin: {
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E5F8F2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  btn_socialLogin_text: {
    fontFamily: FONT.regular,
    fontSize: 12,
    color: 'black',
    marginLeft: 20,
    alignSelf: 'center',
  },

  or_text: {
    alignSelf: 'center',
    fontFamily: FONT.medium,
    fontSize: 15,
    color: 'white',
    marginTop: 24,
  },

  icon: {
    width: 24,
    height: 24,
  },

  footer_signup: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  footer_signup_clicked: {
    marginTop: 16,
    justifyContent: 'center',
  },
  footer_text: {
    fontFamily: FONT.regular,
    fontSize: 16,
    color: 'white',
  },
  footer_textTouch: {
    color: '#03D396',
    fontFamily: FONT.regular,
    fontSize: 16,
  },
});
