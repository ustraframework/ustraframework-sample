package sample.ustraframework.java.fo.config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

import com.gsitm.ustra.java.security.authentication.UstraAuthenticationConfigurer;
import com.gsitm.ustra.java.security.authentication.authentication.UstraAuthentication;
import com.gsitm.ustra.java.security.authentication.processor.DefaultUstraAuthenticationProcessor;
import com.gsitm.ustra.java.security.authentication.processor.UstraAuthenticationProcessor;
import com.gsitm.ustra.java.security.authentication.request.token.UserNamePasswordAuthenticationRequestToken;
import com.gsitm.ustra.java.security.authentication.user.UstraAnonymousUser;
import com.gsitm.ustra.java.security.authentication.user.UstraUser;
import com.gsitm.ustra.java.security.authentication.user.UstraUserDetailProvider;
import com.gsitm.ustra.java.security.config.UstraSecurityConfigure;

@Configuration
public class AuthenticationConfiguration {

	@Bean
	UstraSecurityConfigure securityConfigure() {
		return new UstraSecurityConfigure() {
			@Override
			public void postConfigure(WebSecurity web) throws Exception {
				web.ignoring()
					.antMatchers("/api/auth/login");
			}
		};
	}

	@Bean
	UstraAuthenticationProcessor<UserNamePasswordAuthenticationRequestToken, UstraAuthentication> authenticationProcessor() {

		return new DefaultUstraAuthenticationProcessor<>(
				new UstraAuthenticationConfigurer<UserNamePasswordAuthenticationRequestToken, UstraAuthentication>() {

					public UstraUserDetailProvider<UserNamePasswordAuthenticationRequestToken,UstraAuthentication> userDetailProvider(
							UstraAuthenticationProcessor<UserNamePasswordAuthenticationRequestToken, UstraAuthentication> processor) {

						return new UstraUserDetailProvider<UserNamePasswordAuthenticationRequestToken, UstraAuthentication>() {

							@Override
							public UstraUser getUserDetails(
									UserNamePasswordAuthenticationRequestToken authenticationRequestToken) {

								return new UstraAnonymousUser(new ArrayList<>());
							}

							@Override
							public UstraUser getUserDetails(UstraAuthentication authentication) {

								return new UstraAnonymousUser(new ArrayList<>());
							}
						};
					};
				}
				, UstraAuthentication.class);
	}

}
