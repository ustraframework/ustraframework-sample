package sample.ustraframework.java.bo.sample;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class SampleModel {

	private String grpCd;
	private String dtlCd;
	private String cdNm;
	private String cdDesc;
	private String useYn;
	private String rmk;
	private LocalDateTime regDttm;
	private String regUsrId;
	private String regUsrIp;
	private LocalDateTime updDttm;
	private String updUsrId;
	private String updUsrIp;

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Criteria {
		private SearchValue searchValue;

		@Data
		@Builder
		@NoArgsConstructor
		@AllArgsConstructor
		public static class SearchValue {
			private String grpCd;
			private String dtlCd;
		}
	}
}
