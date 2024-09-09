```typescript
this.$ustra.mobile.bridge.addNativeListener('IF-INBOUD-MOBILE01', data => {
  console.log('nativate inbound data', data)
})

// 브라우저 콘솔 창에서 아래와 같이 테스트 수행
window['IF_INBOUD_MOBILE01']({ data: { param1: 'value1' }})
```

