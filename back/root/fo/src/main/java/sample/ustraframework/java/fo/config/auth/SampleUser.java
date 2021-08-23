package sample.ustraframework.java.fo.config.auth;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import com.gsitm.ustra.java.security.authentication.user.UstraUser;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SampleUser extends UstraUser {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -6807776765213734147L;


	/**
	 * 사용자 표시 명
	 */
	private String displayName;

	public SampleUser(String username) {
		super(username);
	}

	public SampleUser(String username, Collection<? extends GrantedAuthority> authorities) {
		super(username, authorities);
	}

	public SampleUser(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked,
			Collection<? extends GrantedAuthority> authorities) {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
	}

}
