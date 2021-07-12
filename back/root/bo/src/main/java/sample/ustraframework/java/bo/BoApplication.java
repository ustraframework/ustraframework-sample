package sample.ustraframework.java.bo;

import java.io.IOException;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gsitm.ustra.java.mvc.app.ServletApplicationRunner;

@SpringBootApplication
public class BoApplication extends ServletApplicationRunner{

	public static void main(String[] args) throws IOException {
		ServletApplicationRunner.run(BoApplication.class, args);
	}

}
