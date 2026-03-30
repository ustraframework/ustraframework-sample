package sample.ustraframework.java.fo.sample.auth;

import com.gsitm.ustra.java.management.authentication.UstraSystemUser;
import com.gsitm.ustra.java.security.authentication.UstraAuthenticationManager;
import com.gsitm.ustra.java.security.authentication.user.UstraUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.ustra.java.security.authentication.authentication.UstraAuthentication;
import com.gsitm.ustra.java.security.authentication.request.token.UserNamePasswordAuthenticationRequestToken;

@RestController
public class AuthenticationController {

	@Autowired
	UstraAuthenticationManager<UstraSystemUser> authenticationManager;

	/**
	 * 로그인 처리
	 * @param token
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/api/auth/login")
	public UstraAuthentication<UstraSystemUser> login(@RequestBody UserNamePasswordAuthenticationRequestToken token) throws Exception {
		return authenticationManager.authenticate(token);
	}

	/**
	 * 로그아웃 처리
	 */
	@PostMapping("/api/auth/logout")
	public void logout() {
		authenticationManager.unAuthenticate(authenticationManager.getAuthentication());
	}

}
