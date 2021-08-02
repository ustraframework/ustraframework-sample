//package sample.ustraframework.java.fo.config.auth;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import com.gsitm.ustra.java.security.authentication.request.token.UserNamePasswordAuthenticationRequestToken;
//import com.gsitm.ustra.java.security.authentication.request.token.UstraAuthenticationRequestToken;
//import com.gsitm.ustra.java.security.authentication.user.UstraUser;
//import com.gsitm.ustra.java.security.authentication.user.UstraUserDetailProvider;
//import com.gsitm.ustra.java.security.jwt.authentication.authentication.UstraJwtAuthentication;
//
//import sample.ustraframework.java.fo.sample.user.UserModel;
//import sample.ustraframework.java.fo.sample.user.UserService;
//
///**
// * 사용자 정보 조회
// *
// */
//public class SampleUserDetailProvider implements UstraUserDetailProvider<UstraAuthenticationRequestToken, UstraJwtAuthentication> {
//
//	@Autowired private UserService userService;
//
//	@Override
//	public UstraUser getUserDetails(UstraAuthenticationRequestToken authenticationRequestToken) {
//
//		if (authenticationRequestToken instanceof UserNamePasswordAuthenticationRequestToken) {
//
//			UserNamePasswordAuthenticationRequestToken requestToken = (UserNamePasswordAuthenticationRequestToken)authenticationRequestToken;
//			userService.getUserByIdPassword(requestToken.getUserName(), requestToken.getPassword());
//		}
//
//	}
//
//	@Override
//	public UstraUser getUserDetails(UstraJwtAuthentication authentication) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//
//	private SampleUser getUser(String usrId) {
//		UserModel userModel = userService.getUserById(usrId);
//
//		if (userModel == null) {
//			return null;
//		}
//
//		SampleUser user = new SampleUser(userModel.getUsrId());
//		user.setDisplayName(userModel.getUsrNm());
//
//		return user;
//
//	}
//
//}
