import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, "sdk_abrar_7d392519c2").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "My Button!",
      iconClass:'my_btn',
      orderHint:'1',
      onClick(event) {
        event.composeView.insertTextIntoBodyAtCursor("Hello World!");
      },
    });
    composeView.on('presending',function(event) {
      console.log('presending');
      event.cancel();
    })
    composeView.on('sendCanceled',function(){
      console.log('sendCanceled')
    })
    // composeView.on('sending',function(event) {
    //   console.log('sending')
    // })
    // composeView.addButton({
    //   title: "!",
    //   iconClass:'my_btn_0',
    //   onClick(event) {
    //     event.composeView.insertTextIntoBodyAtCursor("Hello World!");
    //   },
    // });
  });

  sdk.Toolbars.registerThreadButton({
    title: "My Button!",
    iconUrl:"https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
    onClick(event) {
      console.log(event);
    },
  })
});
