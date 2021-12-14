import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Share,
  Modal,
  Pressable
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import { images } from '../../assets/images';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { styles } from './styles';
import { isRTL, strings } from '../../i18n';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Preference from 'react-native-preference';
import { viewOffersAPI } from '../../API/methods/offers';
import { redeemEarnedPointsApi } from '../../API/methods/redeem';
import Loader from '../../components/loader1';
import { favouritingAPI, saveOfferApi } from '../../API/methods/offers';
import { favoritingProductAPI, viewProductApi, UnFovoriteProductAPI } from '../../API/methods/video';
import { useIsFocused } from '@react-navigation/native';
const lang = Preference.get('language');

const index = props => {
  const [isBuffering, setIsBuffering] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState(false);
  const [type, setType] = useState(null);
  const [setting, setSetting] = useState(false);
  const [offerData, setOfferData] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [redeemedPoints, setRedeemedPoints] = useState(0);
  const [favouriteData, setfavouriteData] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [productOwnerModal, setProductOwnerModal] = useState(false);
  const focused = useIsFocused();
  const videoPlayerRef = useRef();
  const { id = -1, from: screen } = props?.route?.params;
  // const [progress,setProgress]=useState(0)

  useEffect(() => {
    if (focused) {
      viewProduct();
    } else {
      setShowSetting(false)
    }
  }, [focused]);

  useEffect(() => {
    if (focused) {
      if (counter <= offerData?.duration) {
        setTimeout(() => {
          let progress = ((counter / offerData?.duration) * 100).toFixed(0)
          console.log("Duration", progress)
          setVideoProgress(progress)
          setCounter(counter + 1)
          setCurrentProgress(counter + 1)
        }, 1000);
      }
      if (counter == offerData?.duration) {
        //Call Redeme Func
        redeemEarning()
      }
    } else {
      setCounter(0);
      setVideoProgress(0);
      setOfferData(null)
    }
  }, [counter])

  const saveProduct = async () => {
    console.log('Yes', id);
    try {
      const response = await favoritingProductAPI(id);
      console.log('viewsavingVideosAPI-response', response.status);
    } catch (error) {
      console.log('viewsavingVideosAPI-error', error);
    }
  };
  const UnsaveProduct = async () => {
    console.log('Yes', id);
    try {
      const response = await UnFovoriteProductAPI(id);
      console.log('viewUnsaveVideosAPI-response', response.status);
    } catch (error) {
      console.log('viewUnsaveVideosAPI-error', error);
    }
  };

  const viewProduct = async () => {
    console.log('Yes!ViewProduct', id);
    setLoading(true);
    try {
      const response = await viewProductApi(id);
      setLoading(false);
      setOfferData(response.data.data);
      setstate(response.data.data.favourite)
      setType(response.data.data.type);
      console.log('viewProductApi-response', response.data.data);
    } catch (error) {
      setLoading(false);
      console.log('viewProduct-viewProductApi-error', error);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'This is my advertisemnt watch it and enjoy!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const _onLoadStart = () => {
    setIsBuffering(true);
  }
  const _onLoad = (data) => {
    setVideoDuration(data.duration)
    console.log('VideoItem-12', '_onLoadData', data.duration)
  }
  const _onProgress = (data) => {
    let progress = (data.currentTime / data.seekableDuration).toFixed(1) * 100
    if (isBuffering) {
      setIsBuffering(false);
    }
    setCurrentProgress((data.currentTime).toFixed(0))
    setVideoProgress(progress)
    // console.log('VideoItem-12', 'data', progress)
  }
  const _onEnd = () => {
    if (videoProgress == 100) {
      redeemEarning()
      console.log('VideoItem-12', '_onEnd')
    }
  }
  const _onError = (error) => {
    setIsBuffering(false);
  }
  const _onBuffer = () => {
    if (!isBuffering) {
      setIsBuffering(true)
    }
    console.log('VideoItem-12', '_onBuffer')
  }
  const redeemEarning = async () => {
    setShowSetting(true)
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("duration", type == "video" ? videoDuration : offerData?.duration)
      params.append("planId", offerData?._id)
      console.log("Params", params)
      const response = await redeemEarnedPointsApi(params);
      if (response?.data?.data?.totalPoints) {
        setRedeemedPoints(response.data.data.totalPoints)
        setModal1(true)
      }
      setLoading(false);
      console.log('redeemEarning-response', response.data);
    } catch (error) {
      setLoading(false);
      console.log('redeemEarning-error', error);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground onLoadEnd={() => {
          if (type != "video") {
            setCounter(counter + 1)
            setCurrentProgress(counter + 1)
            setVideoDuration(parseInt(offerData?.duration) + 1)
          }
        }} style={{ flex: 1 }} source={{ uri: offerData?.planAttachment }}>
          {type == "video" &&
            <Video
              source={{ uri: offerData.planAttachment }}
              ref={videoPlayerRef}
              paused={false}
              repeat={false}
              playInBackground={false}
              playWhenInactive={false}
              progressUpdateInterval={500}
              maxBitRate={131072}
              automaticallyWaitsToMinimizeStalling={false}
              bufferConfig={{
                minBufferMs: 1500,
                maxBufferMs: 5000,
                bufferForPlaybackMs: 250,
                bufferForPlaybackAfterRebufferMs: 500
              }}
              resizeMode={"cover"}
              posterResizeMode='cover'
              ignoreSilentSwitch={"ignore"}
              volume={1.0}
              onLoadStart={_onLoadStart}
              onLoad={_onLoad}
              onProgress={_onProgress}
              onEnd={_onEnd}
              onError={_onError}
              onBuffer={_onBuffer}
              style={styles.backgroundVideo}
            />
          }
          <View style={styles.header}>
            {/* {console.log("URL",offerData.url)} */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{ paddingVertical: 20 }}>
              <Image style={styles.bacIcon} source={images.back} />
            </TouchableOpacity>
            {!setting && (videoDuration - currentProgress).toFixed(0) != 0 ? (
              <View
                style={[
                  styles.detailBar,
                  {
                    // flexDirection: 'row',
                    // paddingHorizontal: 10,
                    backgroundColor: 'white',
                    marginTop: 18,
                    marginBottom: 18,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: "center"
                  },
                ]}>
                {/* <View style={{ padding: 2 }}> */}
                <Text>{`${(videoDuration - currentProgress).toFixed(0)}`}</Text>
                {/* <ProgressCircle
                    percent={videoProgress}
                    radius={12}
                    borderWidth={2}
                    color="orange">
                    <Text
                      style={{
                        color: 'orange',
                        fontWeight: 'bold',
                        fontSize: 16,
                        // paddingBottom: 2,
                      }}>
                      i
                    </Text>
                  </ProgressCircle> */}
                {/* </View> */}
                {/* <Text
                  style={{
                    // writingDirection: 'rtl',
                    // textAlign: 'center',
                    // marginTop: 5,
                  }}>
                  {strings('play.get_off')}
                </Text> */}
              </View>
            ) : (
              <View />
            )}
          </View>
          <View style={styles.bottomIconsView}>
            {showSetting && <TouchableOpacity
              onPress={() => {
                setSetting(!setting);
              }}>
              <Image style={styles.bottomIcons} source={images.setting2} />
            </TouchableOpacity>}
            <TouchableOpacity
            onPress={() => setProductOwnerModal(true)}
            >
              <Image style={styles.bottomIcons} source={{ uri: offerData?.promoterImage }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                state
                  ? UnsaveProduct(offerData.id)
                  // : screen == 'offer'
                  // ? saveOffer(offerData.id)
                  : saveProduct(offerData.id);
                // favouriteProduct(offerData.id)
                setstate(!state);
              }}>
              <Image
                style={styles.bottomIcons}
                source={state ? images.bookmarkActive : images.bookmarkInactive}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Image style={styles.bottomIcons} source={images.share} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomTextView}>
            <Text style={styles.Text}>{strings('play.ad_desc_1')}</Text>
            <Text style={styles.Text}>{strings('play.ad_desc_2')}</Text>
          </View>
        </ImageBackground>
        {/* <Progress.Circle size={30} progress={videoProgress} style={{ position: "absolute" }} /> */}
        <Loader showLoading={loading} />
        <Loader showLoading={isBuffering} />
        <Modal animationType="slide" transparent={true} visible={modal1}>
          <Pressable
            onPress={() => {
              setModal1(false);
            }}
            style={styles.madal2}>
            <View style={styles.modalMainView}>
              <BlurView
                style={styles.absolute}
                // viewRef={modal2}
                blurType="light"
                blurAmount={40}
                reducedTransparencyFallbackColor="white"
              />
              <Image
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
                source={images.check}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  marginVertical: 20,
                  writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                }}>
                {strings('gift_box.replacement_successful')}
              </Text>
              <Text
                style={{
                  color: 'gray',
                  marginBottom: 20,
                  writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                }}>
                {strings('gift_box.remaining_points')}
              </Text>
              <View style={styles.textBar}>
                <Text
                  style={{
                    color: '#FE921A',
                    fontSize: 20,
                    writingDirection: lang == 'en' ? 'ltr' : 'rtl',
                  }}>
                  {`${redeemedPoints.toFixed(2)} Points`}
                </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
        <Modal transparent visible={productOwnerModal}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={styles.promoterInfoView}>
              <Pressable onPress={()=>setProductOwnerModal(false)} style={styles.closeButton}>
              <AntDesign name={"closecircle"} size={26}/>
              </Pressable>
              <Image style={styles.promoterInfoImage} source={{ uri: offerData?.promoterImage }} />
              <Text style={{marginTop:10}}>
                {offerData?.promoterDescription.toUpperCase()}
              </Text>

            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default index;
