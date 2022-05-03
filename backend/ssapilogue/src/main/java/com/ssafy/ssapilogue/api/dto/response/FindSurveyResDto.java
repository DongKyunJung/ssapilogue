package com.ssafy.ssapilogue.api.dto.response;

import com.ssafy.ssapilogue.core.domain.Survey;
import com.ssafy.ssapilogue.core.domain.SurveyOption;
import com.ssafy.ssapilogue.core.domain.SurveyType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel("FindSurveyResDto")
public class FindSurveyResDto {

    @NotNull
    @ApiModelProperty(value = "설문조사 id")
    private String surveyId;

    @NotNull
    @ApiModelProperty(value = "설문조사 제목", example = "싸필로그가 유용했나요?")
    private String title;

    @NotNull
    @ApiModelProperty(value = "설문조사 타입", example = "객관식")
    private SurveyType surveyType;

    @ApiModelProperty(value = "객관식 질문 옵션")
    private List<SurveyOption> surveyOptions;

    public FindSurveyResDto(Survey survey) {
        surveyId = survey.getId();
        title = survey.getTitle();
        surveyType = survey.getSurveyType();
        surveyOptions = survey.getSurveyOptions();
    }
}
