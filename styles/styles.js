import { StyleSheet } from 'react-native';

export const introStyles = StyleSheet.create({
  bottomLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  container: { 
    backgroundColor: '#212F3D',
    flex: 1
  },
  introIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    color: 'white',
    fontSize: 30
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const loginStyles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderColor: MKColor.Green,
    borderRadius: 150,
    borderWidth: 2,
    height: 150,
    justifyContent: 'center',
    width: 150
  },
  bottomLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  iconForPassword: {
    position: 'absolute',
    top: 45,
    right: 45
  },
  imageIcons: {
    borderRadius: 40,
    height: 45,
    margin: 10,
    padding: 10,
    resizeMode: 'stretch',
    width: 45
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  loginForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  selectLogin: {
    flexDirection: 'row',
    flex: 1,
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const registerStyles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
   },
  bottomLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  iconForPassword: {
    position: 'absolute',
    top: 45,
    right: 45
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  registerForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const secureRegisterStyles = StyleSheet.create({
  backToLogin: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomRegister: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  verifyButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const forgotStyles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomForgot: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container : {
    backgroundColor: '#212F3D',
    flex: 1
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  forgotButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  forgotForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const secureChangeStyles = StyleSheet.create({
  backToLogin: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomRegister: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

export const mainStyles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 1
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  cardText: {
    fontSize: 16,
    padding: 10
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#212F3D',
    flex: 1,
    justifyContent: 'center'
  },
  detailButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  gridViewContainer: {
    justifyContent:'center',
    overflow: "hidden",
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#231F20',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
    padding: 5
  },
  loader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white'
  }
});

export const userProfileStyles = StyleSheet.create({
  alignIcons: {
    marginRight: 10,
    marginTop: 20
  },
  avatar: {
    borderColor: MKColor.Green,
    borderWidth: 2.5,
    borderRadius: 150,
    height: 150,
    marginTop: 15,
    width: 150
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
  },
  informationBox: {
    backgroundColor: '#161F28',
    borderColor: MKColor.Green,
    borderRadius: 3,
    borderWidth: 1.5,
    // flexDirection: 'row',
    marginTop: 15,
    width: '75%'
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  profileForm: {
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    paddingLeft: 5
  }
});

export const editProfileStyles = StyleSheet.create({
  avatar: {
    borderColor: MKColor.Green,
    borderWidth: 2.5,
    borderRadius: 150,
    height: 150,
    marginTop: 15,
    width: 150
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomEditProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editProfileForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  iconForPassword: {
    position: 'absolute',
    top: 45,
    right: 45
  },
  modalAlert: {
    backgroundColor: '#212F3D',
    borderRadius: 5,
    padding: 65
  },
  modalContainer: {
    alignItems: 'center', 
    flex: 1,
    justifyContent: 'center'
  },
  modalNoButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10
  },
  modalYesButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10
  },
  showUserData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    paddingLeft: 5
  }
});

export const settingButtonStyles = StyleSheet.create({
  background: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 30,
    bottom: 20,
    height: 60,
    position: 'absolute',
    right: 20,
    width: 60
  },
  container: {
    flex: 1
  },
  label: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    position: 'absolute'
  },
  menu: {
    backgroundColor: MKColor.Green
  },
  setting: {
    backgroundColor: MKColor.LightGreen
  },
  settingButton: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#333',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 60
  }
});

export const editInfoStyles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editInfoButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editInfoForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  whiteText: {
    color: 'white',
    paddingLeft: 5
  }
});

export const loaderStyles = StyleSheet.create({
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
    justifyContent: 'center'
  }
});