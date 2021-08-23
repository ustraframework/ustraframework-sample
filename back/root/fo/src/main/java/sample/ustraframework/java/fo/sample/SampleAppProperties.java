package sample.ustraframework.java.fo.sample;

import org.springframework.boot.context.properties.ConfigurationProperties;

import com.gsitm.ustra.java.security.jwt.authentication.properties.UstraJwtAuthenticationProperties;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = SampleAppProperties.PREFIX, ignoreInvalidFields = true, ignoreUnknownFields = true)
public class SampleAppProperties {

	public static final String PREFIX = "ustra.sample";


	private UstraJwtAuthenticationProperties authentication;

}
