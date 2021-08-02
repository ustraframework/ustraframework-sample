package sample.ustraframework.java.fo.test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gsitm.ustra.java.test.UstraSpringTest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableAutoConfiguration
@ComponentScan("sample.ustraframework.java.fo")
public class PasswordTest extends UstraSpringTest {

	@Autowired private PasswordEncoder passwordEncoder;

	/**
	 * 패스워드 생성 테스트
	 */
	@Test
	public void generateUserPassword() {

		String generatedPassword = passwordEncoder.encode("password");
		log.info("generatedPassword : {}", generatedPassword);
	}

}
