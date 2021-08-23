package sample.ustraframework.java.fo.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gsitm.ustra.java.core.utils.UstraResourceUtils;
import com.gsitm.ustra.java.data.logging.interfaces.provider.InterfaceInfoProvider;
import com.gsitm.ustra.java.data.logging.interfaces.provider.XmlResourceInterfaceInfoProvider;

@Configuration
public class InterfaceConfiguration {

	@Bean
	public InterfaceInfoProvider interfaceInfoProvider() throws IOException {
		return new XmlResourceInterfaceInfoProvider(UstraResourceUtils.getResourcesByPattern("classpath*:/data/interfaces-*.xml"));
	}
}
