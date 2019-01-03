import React from 'react';
import PropTypes from 'prop-types';
import palette from '../../palette';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Switch,
    TouchableNativeFeedback,
    BackHandler,
} from 'react-native';
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class SettingsMainScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,

        setUser: PropTypes.func.isRequired,
    };

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return params.backButton
            ? { title: 'Main Settings' }
            : {
                title: 'Main Settings',
                headerLeft: null,
                headerRight: (
                    <View style={[styles.settingsHeadButtonWrap]}>
                        <TouchableNativeFeedback
                            onPress={params.handleSave}
                            background={TouchableNativeFeedback.SelectableBackground()}
                            borderRadius={20}
                        >
                            <View style={styles.settingsHeadButton}>
                                <Icon
                                    name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
                                    color={palette.color2}
                                    size={35}
                                    onPress={this.saveSettings}
                                />
                            </View>

                        </TouchableNativeFeedback>

                    </View>
                )
            };

    };


    constructor(props){
        super(props);

        this.state = {
            patient: props.user.patient === null ? false : props.user.patient,
        };

        this.didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }


    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.saveSettings });
        this.willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentWillUnmount() {
        this.didFocusSubscription && this.didFocusSubscription.remove();
        this.willBlurSubscription && this.willBlurSubscription.remove();
    }


    onBackButtonPressAndroid = () => {
        const {navigation} = this.props;

        return !navigation.state.params.backButton;
    };

    onPatientStatusChange = (status) => {

        this.setState({
            patient: status,
        });

    };

    renderPatientSelector = () => {
        const { patient } = this.state;

        return(<View style={[styles.settingsLine]}>

            <View style={[styles.settingsLineWrap]}>
                <Text style={[styles.settingsLabel]}>Patient:</Text>
            </View>

            <View style={[styles.settingsLineWrap]}>
                <Switch
                    value={patient}
                    onValueChange={this.onPatientStatusChange}
                    trackColor={{
                        true: palette.color4
                    }}
                    thumbColor={palette.color1}
                />
            </View>

        </View>);
    };

    renderUserInfo = () => {
        const {user} = this.props;
        const photoSrc = {
            uri: user.photoURL
        };

        return (<View style={[styles.userInfo]}>
            <Image style={[styles.userPhoto]} source={photoSrc}/>
            <Text style={[styles.userName]}>{user.displayName}</Text>
            <Text style={[styles.userEmail]}>{user.email}</Text>
        </View>);
    };

    saveSettings = () => {
        const {setUser, user} = this.props;
        const {patient} = this.state;

        setUser( {
            ...user,
            updatedAt: Date.now(),
            patient,
        } );

        this.props.navigation.navigate('Home');
    };


    render() {

        return (<View style={[styles.settings]}>

            <ScrollView style={[styles.settingsWrap]}>

                {this.renderUserInfo()}

                {this.renderPatientSelector()}

            </ScrollView>

        </View>);

    }

}

const styles = StyleSheet.create({
    userInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderColor: palette.color5,
        borderBottomWidth: 1,
        alignSelf: 'stretch',
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        color: palette.color2,
        fontSize: 18,
        marginBottom: 5,
    },
    userEmail: {
        color: palette.color2,
        fontSize: 14,
    },
    settings: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    settingsHeadButtonWrap: {
        flex: 1,
        overflow: 'hidden',
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    settingsHeadButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.color5,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    settingsTitle: {
        color: palette.color2,
        fontSize: 20,
        lineHeight: 50,
    },
    settingsWrap: {
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'stretch',
    },
    settingsLine: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: palette.color5,
        borderBottomWidth: 1,
    },
    settingsLabel: {
        color: palette.color2,
        fontSize: 20,
    },
    settingsLineWrap: {
        flex: 1,
    },
});

export default SettingsMainScreen;
