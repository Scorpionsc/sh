import React from 'react';
import PropTypes from 'prop-types';
import palette from '../../palette';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    Switch,
    TouchableOpacity,
    TouchableNativeFeedback,
    BackHandler,
    Platform,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {StackActions, NavigationActions} from 'react-navigation';

class SettingsMainScreen extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,

        setUser: PropTypes.func.isRequired,
    };

    static getDerivedStateFromProps = (nextProps) => {

        const {justRegister, user, setJustRegister} = nextProps;

        if (justRegister && user.patient !== null) {
            setJustRegister(false);

            return {
                shouldRenderHome: true,
            }
        }

        return null;
    };

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        const options = {
            title: 'Main Settings',
            tabBarVisible: false,
            headerRight: Platform.OS === 'ios'
                ? (
                    <View>
                        <TouchableOpacity style={[styles.settingsHeadButtonWrapIOS]}
                                          onPress={() => params.handleSave()}>
                            <Icon
                                name='ios-checkmark'
                                color={palette.color2}
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                )
                : (
                    <TouchableNativeFeedback
                        onPress={params.handleSave}
                        background={TouchableNativeFeedback.SelectableBackground()}
                        borderRadius={20}
                    >
                        <View style={styles.settingsHeadButton}>
                            <Icon
                                name='md-checkmark'
                                color={palette.color2}
                                size={35}
                                onPress={() => params.handleSave()}
                            />
                        </View>

                    </TouchableNativeFeedback>
                ),
        };

        if (params) {

            return params && params.backButton
                ? options
                : {
                    ...options,
                    headerLeft: null,
                };

        } else {
            return options
        }

    };


    constructor(props) {
        super(props);

        this.state = {
            patient: props.user.patient === null ? true : props.user.patient,
            shouldRenderHome: false,
        };
        this.props.navigation.setParams({handleSave: this.saveSettings});

        this.subscribeBackButton();

    }


    componentDidMount() {
        const {navigation} = this.props;

        if (navigation.state.params && !navigation.state.params.backButton) {
            this.props.navigation.setParams({handleSave: () => this.saveSettings()});
            this.willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
                BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
            );
        }
    }

    componentWillUnmount() {
        const {navigation} = this.props;

        if (navigation.state.params && !navigation.state.params.backButton) {
            this.didFocusSubscription && this.didFocusSubscription.remove();
            this.willBlurSubscription && this.willBlurSubscription.remove();
        }

    }


    checkFirstSettings = () => {
        const {shouldRenderHome} = this.state;

        if (shouldRenderHome) {
            this.props.navigation.navigate('Home');
        }
    };

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
        const {patient} = this.state;

        return (<View style={[styles.settingsLine]}>

            <View style={[styles.settingsLineWrap]}>
                <Text style={[styles.settingsLabel]}>Patient:</Text>
            </View>

            <View style={[styles.settingsLineWrap, styles.settingsLineWrapLeft]}>
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

    resetNavigation = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'More'})],
        });

        this.props.navigation.dispatch(resetAction);
    };

    saveSettings = () => {
        const {setUser, user} = this.props;
        const {patient} = this.state;

        setUser({
            ...user,
            updatedAt: Date.now(),
            patient,
        });

        this.resetNavigation();

        this.props.navigation.navigate('Home');
    };

    subscribeBackButton = () => {
        const {navigation} = this.props;

        if (navigation.state.params && !navigation.state.params.backButton) {
            this.didFocusSubscription = navigation.addListener('didFocus', () =>
                BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
            );
        }
    };


    render() {

        this.checkFirstSettings();

        return (<SafeAreaView style={[styles.settings]}>

            <ScrollView style={[styles.settingsWrap]}>

                {this.renderUserInfo()}

                {this.renderPatientSelector()}

            </ScrollView>

        </SafeAreaView>);

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
    settingsHeadButtonWrapIOS: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.color5,
        width: 40,
        height: 40,
        borderRadius: 20,
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
    settingsLineWrapLeft: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
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
