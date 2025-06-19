<template>
  <div class="container">
    <v-card 
      style="margin: 10px;"
      color="#F6F1E9"
      subtitle="Ustra F/W"
      width="1000"
    >
      <template v-slot:title>
        <span class="font-weight-black"><v-icon icon="mdi-tooltip-question-outline"/> Forum</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        U.STRA Framework의 Forum은 GitHub를 통하여 운영합니다. <br />
        GitHub 계정이 없으신 분들은 계정 생성 후에 프레임워크 문의 또는 요구 사항을 작성하여 주시기 바랍니다. <br /><br />

        1. GitHub Issue 이동 : <a href="https://github.com/ustraframework/ustraframework/issues" target="_blank">https://github.com/ustraframework/ustraframework/issues</a><br /><br />

        2. 이슈 사항 중 보안 상 문제가 발생하는 부분은 프레임워크 대표 이메일 주소로 자료를 첨부하여 주시면 됩니다. (ustraframe@gmail.com)
      </v-card-text>
    </v-card>
    <v-card 
      style="margin: 10px;"
      color="#EDEEF7"
      subtitle="Ustra F/W"
      width="1000"
    >
      <template v-slot:title>
        <span class="font-weight-black"><v-icon icon="mdi-align-vertical-bottom"/> 기술동향</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        약 25년 이상의 역사를 가진 웹 어플리케이션은 최근 대내외의 상황 변화와 대응 기술의 영항도로 인해 급격한 변화를 맞이하고 있습니다. 과거에는 단일 웹 페이지 자체를 서비스하고 사용자의 Action 또는 의도된 프로세스에 따라 웹 페이지에서 웹 페이지로의 전환이 이루어지는 형태의 서비스가 대부분이었습니다. <br/><br/>

        Java 기반의 웹 개발을 경험한 개발자라면 서블릿 어플리케이션의 설정 중 반드시 필요한 부분이 바로 View 영역의 설정이었으며, 흔히 ViewResolver 의 설정에 따른 적절한 View와 데이터를 매핑하고 이를 템플릿 엔진에 의해 변환되는 형태로 개발이 이루어졌습니다. 이런 웹 개발 상황에서는 템플릿 엔진에 대한 이해도가 높고, 템플릿 엔진 자체에 커스톰 기능을 생성하여 개발 생산성을 향상할 수 있는 템플릿 엔진 영역의 전문가가 필요로 했습니다. <br/><br/>

        페이지 단위 서비스 방식은 Ajax라는 신기술에 의해 부분적 변화가 일어났습니다. 해당 기술은 웹 브라우저 상에서 페이지에 대한 재 조회 없이 필요한 데이터 영역을 실시간으로 조회하여 사용자의 응답 UI를 개선할 수 있는 방식이었습니다. Ajax라는 기술로 인해 서비스의 질적인 부분은 개선이 될 수 있었지만 개발자 입장에서는 페이지 레벨에서 데이터를 모두 생성하여 서비스하는 것이 아닌 데이터 단위로 정보를 제공하는 API 형태로의 전환이 필수적으로 필요한 상태가 되었습니다. <br/><br/>

        이런 부분적으로 난립되는 API 형태의 서비스는 SOA 라는 용어를 탄생하게 했습니다. SOA를 번역하면 서비스 지향 아키텍처라고 부를 수 있습니다. 서비스 지향 아키텍처는 서비스의 제공 방식을 표준화하고, 서비스 호출에서 일어날 수 있는 예외와 요청, 응답 파라메터의 표준 포맷을 요구하였습니다. 이로 인해 SOAP, WSDL 등의 추가 표준 기술 등이 탄생하는 계기가 되었습니다. 하지만 요구 표준 포맷으로 인한 많은 네트워크 트래픽의 사용, 서비스의 확장성 저하 등으로 인해 기술의 동향은 다시 REST API 형태로 전환되었습니다. <br/><br/>

        REST API는 HTTP SPEC에 정의되어 있는 자원을 충분히 활용하여 서비스 가능한 API 서비스 유형의 일종입니다. 우스운 얘기일 수 있지만 여기서 누구나 API를 개발한다면 그것 또한 REST API의 일종이 될 수 있습니다. 그 개념이 HTTP SPEC을 충실히 이용가능하다고 한다면 말입니다. REST API는 HTTP의 상태, 메소드 또는 Path 등에 대한 권고는 하고 있지만 사실 상세 규약 사항은 없습니다. Body 영역 또한 특별한 제약 사항이 없는 것은 마찬가지입니다. 하지만 REST API 형태의 서비스가 증가되면 증가될 수록 웹 페이지 Base의 서비스는 점차 Dynamic 한 형태로 변화하게 되는 원동력이 되었습니다. 사실 쉬운 API 서비스를 개발할 수 있는 것은 많은 서비스 생산을 가능하게 하고 이로인한 서비스의 개발과 서비스의 방식도 변화할 수 있습니다. <br/><br/>

        이후의 웹 서비스는 웹 페이지 자체를 비즈니스 로직이 없는 단순한 고정 자원으로 보기 시작했습니다. 웹 브라우저에서 흔히 소스 보기 기능을 통해 볼 수 있는 HTML 소스 형태로 말입니다. 사실 고정 자원은 굳이 Web Application Service 영역에 포함될 필요가 없는 리소스입니다. 따라서 웹 페이지는 WAS의 영역이 아닌 Web Server가 서비스할 수 있는 유형이 되었습니다.

        사실 이 외에도 어플리케이션의 기술 변화는 지속적으로 변화하고 있으며, 이에 따라 선호되는 기술도 변화가 가속되고 있습니다. 
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  auth: {
    required: false,
  },
})
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>