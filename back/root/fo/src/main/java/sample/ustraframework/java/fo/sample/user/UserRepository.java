package sample.ustraframework.java.fo.sample.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

	/**
	 * 사용자 아이디와 패스워드 정보 조회
	 * @param usrId 아이디
	 * @param password 패스워드
	 * @return
	 */
	UserModel selectUserByIdPassword(String usrId, String password);

	/**
	 * 사용자 아이디 조회
	 * @param usrId 아이디
	 * @return
	 */
	UserModel selectUserById(String usrId);

}
