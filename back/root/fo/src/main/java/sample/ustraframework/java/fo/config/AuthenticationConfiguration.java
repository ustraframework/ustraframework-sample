package sample.ustraframework.java.fo.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.gsitm.ustra.java.management.authentication.UstraSystemUser;
import com.gsitm.ustra.java.security.authentication.UstraAuthenticationConfigurer;
import com.gsitm.ustra.java.security.authentication.processor.DefaultUstraAuthenticationProcessor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.Cache;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

import com.gsitm.ustra.java.core.cache.UstraCacheManagerSupport;
import com.gsitm.ustra.java.security.authentication.processor.UstraAuthenticationProcessor;
import com.gsitm.ustra.java.security.authentication.properties.UstraAuthenticationProperties;
import com.gsitm.ustra.java.security.authentication.request.token.UstraAuthenticationRequestToken;
import com.gsitm.ustra.java.security.authentication.user.UstraCachedUserDetailProvider;
import com.gsitm.ustra.java.security.authentication.user.UstraUser;
import com.gsitm.ustra.java.security.authentication.user.UstraUserDetailProvider;
import com.gsitm.ustra.java.security.authentication.user.checker.UstraUserDetailChecker;
import com.gsitm.ustra.java.security.config.UstraSecurityConfigure;

import org.springframework.security.core.GrantedAuthority;
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
					.requestMatchers("/api/auth/login");
			}
		};
	}


	@Bean
	UstraCachedUserDetailProvider<UstraSystemUser> userDetailProvider() {
		return new UstraCachedUserDetailProvider<>() {

			@Override
			public Long getUserDetailsRevision(String username) {
				return 0L;
			}

			@Override
			public UstraSystemUser createAnonymousUserDetails() {
				return null;
			}

			@Override
			public UstraSystemUser recoverUserDetails(String subject, List<String> roles, List<? extends GrantedAuthority> es, HashMap<String, Object> stringObjectHashMap) {
				return null;
			}

			@Override
			protected UstraSystemUser getInternalUserDetails(UstraAuthenticationRequestToken authenticationRequestToken) {
				UstraSystemUser user = new UstraSystemUser("sample", "", true, true, true, true, new ArrayList<>());

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
	UstraAuthenticationProcessor<UstraSystemUser> authenticationProcessor(
			SampleAppProperties sampleAppProperties,
			UstraUserDetailProvider<UstraSystemUser> userDetailProvider) {

		final UstraAuthenticationConfigurer<UstraSystemUser> configurer =
				new UstraAuthenticationConfigurer<>() {

					@Override
					public UstraAuthenticationProperties authenticationProperties() {
						return sampleAppProperties.getAuthentication();
					}

					@Override
					public UstraUserDetailProvider<UstraSystemUser> userDetailProvider() {
						return userDetailProvider;
					}

					@Override
					public UstraUserDetailChecker userDetailChecker() {
						return new UstraUserDetailChecker() {
							@Override
							public void check(UstraAuthenticationRequestToken requestToken, UstraUser userDetails) {

							}
						};
					}

				};

		return new DefaultUstraAuthenticationProcessor<>(configurer);
	}

}
