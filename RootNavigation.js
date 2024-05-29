
// import * as React from 'react';

// export const navigationRef = React.createRef();


// export function navigate(name, params) {
//   console.log('params: ', params);
//   // console.log("name",name)
//   navigationRef.current.navigate(name, params);
// }


import * as React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {

 // navigationRef.current.navigate(name, params);
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    console.log('Navigation not ready yet in navigationService');
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}