```typescript
async function callOutbound() {
  $ustra.mobile.bridge.callNative({
    id: 'IF-OUTBOUND-MOBILE01',
    callback: result => {
      console.log('result', result)
    },
    timeout: 2000,
  })
}
```