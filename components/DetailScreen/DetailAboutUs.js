import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-navigation";
import * as WebBrowser from "expo-web-browser";
import SvgUri from "react-native-svg-uri";
import styles from "../../constants/DetailScreen/DetailAboutUs";

const DetailAboutUs = props => {
  //console.log("DetailAboutUs props: admin status -->", props.adminStatus);
  let profile = props.profile;

  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  childDelete = id => {
    setDeleted(true);
    setConfirm(false);
    props.deactivateUser(id);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill="#3b3b3b"
              width="25"
              height="25"
              source={require("../../assets/icons/clipboard.svg")}
            />
            <Text style={styles.title}>{"About Us"}</Text>
            {props.adminStatus && props.adminStatus === true ? (
              <View style={styles.interaction}>
                {confirm === false && deleted === false ? (
                  <TouchableOpacity
                    style={{ padding: 0, padding: 0 }}
                    onPress={() => setConfirm(true)}
                  >
                    {/* Replace below 👇 SvgUri with trashbin icon */}
                    <SvgUri
                      fill="grey"
                      width="15"
                      height="15"
                      source={require("../../assets/icons/trash-alt-solid.svg")}
                    />

                    {/* Replace above 👆 SvgUri with trashbin icon */}
                  </TouchableOpacity>
                ) : null}
                {confirm === true ? (
                  <View style={styles.confirmation}>
                    <Text style={styles.confirmText}>Are you sure?</Text>
                    <Text
                      style={styles.confirmText}
                      onPress={() => childDelete(comment.comment_id)}
                    >
                      Yes
                    </Text>
                    <Text style={styles.confirmText}>/</Text>
                    <Text
                      style={styles.confirmNo}
                      onPress={() => setConfirm(false)}
                    >
                      No
                    </Text>
                  </View>
                ) : null}
                {deleted === true ? (
                  <View style={styles.confirmation}>
                    <Text style={styles.confirmText}>Deleted</Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
          <Text style={styles.body}>{profile.about_us}</Text>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill="#3b3b3b"
              width="25"
              height="25"
              source={require("../../assets/icons/seedling.svg")}
            />
            <Text style={styles.title}>{"Species & Habitats"}</Text>
          </View>
          <View>
            <Text style={styles.body}>{profile.species_and_habitats}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill="#3b3b3b"
              width="25"
              height="25"
              source={require("../../assets/icons/lightbulb.svg")}
            />
            <Text style={styles.title}>{"Big Issues"}</Text>
          </View>
          <View>
            <Text style={styles.body}>{profile.issues}</Text>
          </View>
        </View>
        <View style={styles.campMission}>
          <View style={styles.iconWrap}>
            <SvgUri
              fill="#3b3b3b"
              width="25"
              height="25"
              source={require("../../assets/icons/hand.svg")}
            />
            <Text style={styles.donateTitle}>{"Support Our Mission"}</Text>
          </View>
          <View>
            <Text style={styles.donateText}>
              Your donation helps us more{"\n"}than you know. Thanks!
            </Text>
            <View style={styles.donateButton}>
              <TouchableOpacity
                onPress={async () =>
                  profile.org_cta &&
                  profile.org_cta !== null &&
                  (await WebBrowser.openBrowserAsync(profile.org_cta))
                }
                style={{
                  paddingTop: 25,
                  paddingBottom: 25,
                  width: 243,
                  height: 50
                }}
              >
                <View
                  style={{
                    backgroundColor: "#00ff9d",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    height: 35
                  }}
                >
                  <Text
                    style={{
                      color: "#323339",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      letterSpacing: 2
                    }}
                  >
                    Donate
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailAboutUs;
