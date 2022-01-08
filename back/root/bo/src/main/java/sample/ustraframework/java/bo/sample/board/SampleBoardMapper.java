package sample.ustraframework.java.bo.sample.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SampleBoardMapper {

	List<SampleBoardModel> select(String title);
	SampleBoardModel selectDetail(Integer boardIdx);
	int insert(SampleBoardModel model);
}
