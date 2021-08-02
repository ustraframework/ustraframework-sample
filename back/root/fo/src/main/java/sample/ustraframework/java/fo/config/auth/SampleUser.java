package sample.ustraframework.java.fo.config.auth;

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

}
