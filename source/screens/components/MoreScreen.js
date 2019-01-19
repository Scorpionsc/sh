import React from "react";
import {StyleSheet, SectionList, SafeAreaView, Text, View} from "react-native";
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

    renderTitle = ({section: {title}}) => {
        return (
            <View style={[styles.moreTitleWrap]}>
                <Text style={[styles.moreTitle]}>{title}</Text>
            </View>
        )
    };


    render() {
        const {menuSections} = this.state;

        return (
            <SafeAreaView style={[styles.more]}>
                <SectionList style={[styles.moreList]} sections={menuSections}
                             renderItem={({item, index}) => <MenuItem key={index} data={item} onClick={this.onItemClick}/>}
                             renderSectionHeader={this.renderTitle}
                             keyExtractor={(item, index) => item + index}/>
            </SafeAreaView>
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
        fontSize: 14,
        fontWeight: '700',
        color: palette.color2,
    },
    moreTitleWrap: {
        borderBottomWidth: 3,
        borderColor: palette.color5,
        paddingTop: 5,
        paddingBottom: 5,
    },

});

export default MoreScreen;