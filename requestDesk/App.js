import * as eva from "@eva-design/eva";
import {ApplicationProvider, Avatar, IconRegistry} from "@ui-kitten/components";
import * as React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Navigator } from "./src/Components/Navigator";
import { store } from "./src/store/reducersMerge";
import { Provider } from "react-redux";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

function App() {
    return (
        <RootSiblingParent>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <Provider store={store}>
                    <Navigator />
                </Provider>
            </ApplicationProvider>
        </RootSiblingParent>
    );
}

export default App;
