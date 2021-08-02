package sample.ustraframework.java.fo.sample.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired private UserService userService;

	@GetMapping("/api/user")
	public UserModel getUser(String usrId) {
		return userService.getUserById(usrId);
	}
}
