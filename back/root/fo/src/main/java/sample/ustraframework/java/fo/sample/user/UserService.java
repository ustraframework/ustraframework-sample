package sample.ustraframework.java.fo.sample.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
	@Autowired private UserRepository userRepository;


	public UserModel getUserByIdPassword(String usrId, String password) {
		return userRepository.selectUserByIdPassword(usrId, password);
	}

	public UserModel getUserById(String usrId) {
		return userRepository.selectUserById(usrId);
	}
}
