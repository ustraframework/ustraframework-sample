package sample.ustraframework.java.fo.config;

import java.util.ArrayList;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.Cache;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.core.Authentication;

import com.gsitm.ustra.java.core.cache.UstraCacheManagerSupport;
import com.gsitm.ustra.java.security.authentication.processor.UstraAuthenticationProcessor;
import com.gsitm.ustra.java.security.authentication.properties.UstraAuthenticationProperties;
import com.gsitm.ustra.java.security.authentication.request.token.UstraAuthenticationRequestToken;
import com.gsitm.ustra.java.security.authentication.user.UstraCachedUserDetailProvider;
import com.gsitm.ustra.java.security.authentication.user.UstraUser;
import com.gsitm.ustra.java.security.authentication.user.UstraUserDetailProvider;
import com.gsitm.ustra.java.security.authentication.user.checker.UstraUserDetailChecker;
import com.gsitm.ustra.java.security.config.UstraSecurityConfigure;
import com.gsitm.ustra.java.security.jwt.authentication.UstraJwtAuthenticationConfigurer;
import com.gsitm.ustra.java.security.jwt.authentication.authentication.UstraJwtAuthentication;
import com.gsitm.ustra.java.security.jwt.authentication.claims.DefaultUstraJwtClaimAppender;
import com.gsitm.ustra.java.security.jwt.authentication.claims.UstraJwtClaimAppender;
import com.gsitm.ustra.java.security.jwt.authentication.claims.UstraJwtClaims;
import com.gsitm.ustra.java.security.jwt.authentication.processor.UstraJwtAuthenticationProcessor;

import sample.ustraframework.java.fo.config.auth.SampleUser;
import sample.ustraframework.java.fo.sample.SampleAppProperties;

@Configuration
@EnableConfigurationProperties({ SampleAppProperties.class } )
public class AuthenticationConfiguration {

	@Bean
	UstraSecurityConfigure customSecurityConfigure() {
		return new UstraSecurityConfigure() {
			@Override
			public void postConfigure(WebSecurity web) throws Exception {
				web.ignoring()
					.antMatchers("/api/auth/login");
			}
		};
	}


	@Bean
	UstraCachedUserDetailProvider<UstraAuthenticationRequestToken, UstraJwtAuthentication, UstraUser> userDetailProvider() {
		return new UstraCachedUserDetailProvider<UstraAuthenticationRequestToken, UstraJwtAuthentication, UstraUser>(UstraUser.class) {

			@Override
			protected UstraUser getInternalUserDetails(UstraAuthenticationRequestToken authenticationRequestToken) {
				SampleUser user = new SampleUser("sample", new ArrayList<>());

				// TODO: 패스워드 비교 등.
				user.setDisplayName("샘플사용자");
				return user;
			}

			@Override
			protected UstraUser getInternalUserDetails(UstraJwtAuthentication authentication) {
				SampleUser user = new SampleUser("sample", new ArrayList<>());
				// TODO: 패스워드 비교 등.
				user.setDisplayName("샘플사용자");
				return user;
			}

			@Override
			protected Cache getCache() {
				return UstraCacheManagerSupport.getCache("authentication");
			}


		};
	}


	@Bean
	UstraJwtAuthenticationProcessor<UstraAuthenticationRequestToken, UstraJwtAuthentication> authenticationProcessor(
			SampleAppProperties sampleAppProperties,
			UstraUserDetailProvider<UstraAuthenticationRequestToken,UstraJwtAuthentication> userDetailProvider) {

		return new UstraJwtAuthenticationProcessor<>(
				new UstraJwtAuthenticationConfigurer<UstraAuthenticationRequestToken, UstraJwtAuthentication>() {

					public UstraAuthenticationProperties authenticationProperties(
							UstraAuthenticationProcessor<UstraAuthenticationRequestToken,UstraJwtAuthentication> processor) {
						return sampleAppProperties.getAuthentication();
					};

					public UstraUserDetailProvider<UstraAuthenticationRequestToken,UstraJwtAuthentication> userDetailProvider(
							UstraAuthenticationProcessor<UstraAuthenticationRequestToken, UstraJwtAuthentication> processor) {
						return userDetailProvider;
					};

					public UstraUserDetailChecker<UstraAuthenticationRequestToken> userDetailChecker(
							UstraAuthenticationProcessor<UstraAuthenticationRequestToken,UstraJwtAuthentication> processor) {
						return new UstraUserDetailChecker<UstraAuthenticationRequestToken>() {

							@Override
							public void check(UstraAuthenticationRequestToken requestToken, UstraUser userDetails) {

							}

						};
					};

					public UstraJwtClaimAppender jwtClaimAppender(
							UstraAuthenticationProcessor<UstraAuthenticationRequestToken,UstraJwtAuthentication> processor) {

						return new DefaultUstraJwtClaimAppender() {
							@Override
							public void append(UstraJwtClaims claims, Authentication authentication) {
								super.append(claims, authentication);

								if (authentication.getDetails() != null && authentication.getDetails() instanceof SampleUser) {
									SampleUser user = (SampleUser)authentication.getDetails();
									claims.getClaims().put("displayName", user.getDisplayName());
								}

							}
						};

					};
				}
				, UstraJwtAuthentication.class);
	}

}
