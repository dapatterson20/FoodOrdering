// This imports the "Redirect" component from the module "expo-router".
// This allows it to immediately redirect from a particular screen to another.
import {Redirect} from 'expo-router';

// The "TabIndex" component is being exported as the default export, 
// meaning when other files import this module they will get this component by default.
export default function TabIndex() {
    // When "TabIndex" is called, it will redirect the user to the "/user/menu/" screen.
    return <Redirect href={'/(user)/menu/'}/>
}
