package sample.ustraframework.java.fo.sample.interfaces;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.ustra.java.data.logging.interfaces.info.InterfaceInfo;
import com.gsitm.ustra.java.data.logging.interfaces.store.InterfaceInfoStore;

@RestController
public class InterfaceApiController {

	@Autowired private InterfaceInfoStore interfaceInfoStore;

	@RequestMapping("/api/interface/all")
	public List<InterfaceInfo> interfaceStore() {
		return this.interfaceInfoStore.getAll()
				.entrySet().stream()
				.map(e->e.getValue())
				.collect(Collectors.toList());
	}

}
