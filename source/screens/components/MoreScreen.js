import React from "react";
import {StyleSheet, SectionList, View, Text} from "react-native";
import palette from "../../palette";
import MenuItem from "../../menuItem/MenuItem";

class MoreScreen extends React.Component {

    static navigationOptions = {header: null};

    state = {
        menuSections: [
            {
                title: 'SETTINGS',
                data: [
                    {
                        title: 'Main Settings',
                        route: 'SettingsMain',
                    },
                ],
            }
        ]
    };


    onItemClick = (itemData) => {

        const {navigation} = this.props;

        navigation.navigate(itemData.route, {backButton: true});

    };


    render() {
        const {menuSections} = this.state;

        return (
            <View style={[styles.more]}>
                <SectionList style={[styles.moreList]} sections={menuSections}
                             renderItem={({item, index}) => <MenuItem key={index} data={item} onClick={this.onItemClick}/>}
                             renderSectionHeader={({section: {title}}) => (<Text style={[styles.moreTitle]}>{title}</Text>)}
                             keyExtractor={(item, index) => item + index}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    more: {
        flex: 1,
        backgroundColor: palette.color3,
        justifyContent: 'flex-start',
        paddingTop: 20,
        alignItems: 'center',
    },
    moreList: {
        marginRight: 20,
        marginLeft: 20,
        alignSelf: 'stretch',
    },
    moreTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: palette.color2,
        borderBottomWidth: 3,
        borderColor: palette.color5,
        paddingTop: 5,
        paddingBottom: 5,
    }

});

export default MoreScreen;