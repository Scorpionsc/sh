import React from 'react';
import PropTypes from 'prop-types';
import palette from '../../palette';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Switch
} from 'react-native';
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class SocialSettings extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,

        setUser: PropTypes.func.isRequired,
    };


    constructor(props){
        super(props);

        this.state = {
            patient: props.user.patient === null ? false : props.user.patient,
        };
    }


    onPatientStatusChange = (status) => {

        this.setState({
            patient: status,
        });

    };

    renderHeader = () => {
        return (<View style={[styles.settingsHead]}>
            <View style={[styles.settingsHeadTitle]}>
                <Text style={[styles.settingsTitle]} numberOfLines={1}>Social settings</Text>
            </View>
            <View style={[styles.settingsHeadButton]}>
                <Icon
                    name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
                    color={palette.color1}
                    size={35}
                    onPress={this.saveSettings}
                />
            </View>
        </View>);
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
    };


    render() {

        console.log(this.state);


        return (<View style={[styles.settings]}>

            { this.renderHeader() }

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
        color: palette.color1,
        fontSize: 18,
        marginBottom: 5,
    },
    userEmail: {
        color: palette.color1,
        fontSize: 14,
    },
    settings: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    settingsHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        alignSelf: 'stretch',
        height: 50,
        backgroundColor: palette.color5,
    },
    settingsHeadTitle: {
        flex: 1,
    },
    settingsHeadButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    settingsTitle: {
        color: palette.color1,
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
        color: palette.color1,
        fontSize: 20,
    },
    settingsLineWrap: {
        flex: 1,
    },
});

export default SocialSettings;
