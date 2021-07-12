package sample.ustraframework.java.fo;

import java.io.IOException;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gsitm.ustra.java.mvc.app.ServletApplicationRunner;

@SpringBootApplication
public class FoApplication extends ServletApplicationRunner {

	public static void main(String[] args) throws IOException {
		ServletApplicationRunner.run(FoApplication.class, args);
	}

}
