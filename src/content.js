import * as InboxSDK from '@inboxsdk/core';
import axios from 'axios';

InboxSDK.load(2, "sdk_abrar_7d392519c2").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    let flag = true;
    composeView.on('presending',function(event) {
      console.log('presending');
      if(flag){
        event.cancel();
      } else {
        composeView.close()
      }      
    })
    composeView.on('sendCanceled',async function(){
      console.log('sendCanceled')      
      console.log(composeView.getThreadID());
      await axios.get('http://localhost:3000/id')//server api to get image src
      .then(res=> {
        console.log(res)
        // -->insert image in HTML body in email from response<--
        flag = false;
        composeView.send()
      })
      .catch(err=> console.log(err))      
    })
    composeView.on('sent',function(event) {
      console.log('sent')
      console.log(event.getMessageID())
      console.log(event.getThreadID())
    })
    // composeView.addButton({
    //   title: "!",
    //   iconClass:'my_btn_0',
    //   onClick(event) {
    //     event.composeView.insertTextIntoBodyAtCursor("Hello World!");
    //   },
    // });
  });

  // sdk.Toolbars.registerThreadButton({
  //   title: "My Button!",
  //   iconUrl:"https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
  //   onClick(event) {
  //     console.log(event);
  //   },
  // })
});
