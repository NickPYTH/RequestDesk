import * as eva from "@eva-design/eva";
import { ApplicationProvider, Avatar } from "@ui-kitten/components";
import * as React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Navigator } from "./src/Components/Navigator";
import { store } from "./src/store/reducersMerge";
import { Provider } from "react-redux";

function App() {
    return (
        <RootSiblingParent>
            <ApplicationProvider {...eva} theme={eva.light}>
                <Provider store={store}>
                    <Navigator />
                </Provider>
            </ApplicationProvider>
        </RootSiblingParent>
    );
}

export default App;
