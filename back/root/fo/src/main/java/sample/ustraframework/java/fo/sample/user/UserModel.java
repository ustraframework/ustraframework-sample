package sample.ustraframework.java.fo.sample.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import com.gsitm.ustra.java.management.models.base.UstraManagementBaseModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 사용자 모델
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class UserModel extends UstraManagementBaseModel {

	/**
	 * 사용자 아이디
	 */
	@NotBlank
	private String usrId;

	/**
	 * 사용자 명
	 */
	@NotBlank
	private String usrNm;

	/**
	 * 패스워드
	 */
	@NotEmpty
	private String pwd;

	/**
	 * 사용자 상태 코드
	 */
	private String usrSttCd;

	/**
	 * 로그인 실패 수
	 */
	private Integer loginFailCnt;

}
