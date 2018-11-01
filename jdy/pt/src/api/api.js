import { fetch, upload, get, post, postParams } from './fetch'
import { DATA_URL, GIFT_URL, LIVE_URL, DATA_API_URL,  lT_URL, HC_URL, WX_API_URL ,MW_Live_API_URL} from './config'
export default {
     /**
     * 主页管理
     * @param {token,page_name} params
     */
    getNewPageByTitle(params) {
        return get(DATA_API_URL + "mainpage/new_page", params)
    },
    /**
     * 获取主页列表
    */
    getMainPageList(params) {
        return get(DATA_API_URL + "mainpage/get_list", params);
    },
    /**
     * 更改主页名称
     */
    modifyPageTitle(params) {
        return get(DATA_API_URL + "mainpage/mod_page_name", params);
    },
    /**
     * 获取主页信息
     * @param {token,page_id} params
     */
    getMainpageInfo(params) {
        return get(DATA_API_URL + "mainpage/get_page_info", params);
    },
    /**
     * 删除主页
     * @param {token,page_id} params
     */
    deletePage(params) {
        return get(DATA_API_URL + "mainpage/del_page", params);
    },
    /**
     * 添加主页菜单
     * @param {token,page_id,menu_name,menu_type,menu_content,menu_index}
     */
    addMainMenu(params){
        return get(DATA_API_URL+"mainpage/new_menu",params);
    },
    /**
     * 修改菜单
     * @param {token,page_id,menu_name,menu_type,menu_content}
     */
    modifyMenu(params){
        return get(DATA_API_URL+"mainpage/mod_menu",params);
    },
    /**
     * 删除主页菜单
     * @param {token,page_id,menu_id,menu_index}
     */
    deleteMenu(params){
        return get(DATA_API_URL+"mainpage/del_menu",params);
    },
    /**
     * 设置主页模板
     * @param {token,page_id,page_page_template}
     */
    changePageTemplate(params){
        return get(DATA_API_URL+"mainpage/set_template",params);
    },
    /**
     * 主页菜单排序
     * @param {token,page_id,menu_args}
     */
    getMenusOrder(params){
        return get(DATA_API_URL+"mainpage/menu_sort",params);
    },

    /**
     * 保存分享信封设置
     */
    setShareEnvelope(params) {
        return get(DATA_API_URL + "mainpage/set_envelope", params);
    },
    /**
     * 主页公众号设置
     */
    setWX(params) {
        return get(DATA_API_URL + "mainpage/set_wechat", params);
    },
    /**
     * 主页客服设置
     */
    setService(params) {
        return get(DATA_API_URL + "mainpage/set_service", params);
    },
    /**
     * 获取扫码授权地址
     */
    getAuthorization(params) {
        return get(WX_API_URL + "wecha_authorization/get_wecha_authorization", params);
    },
    /**
     * 修改用户授权类型
     */
    setAuthorization(params) {
        return get(WX_API_URL + "accredit_info/set_user_accredit", params);
    },
    /**
     * 微信授权成功后回调入库
     */
    getWxCode(params) {
        return get(WX_API_URL + "wecha_authorization/get_wecha_token", params);
    },
    /**
    * 获取用户授权类型
    */
    getUserAccredit(params) {
        return get(WX_API_URL + "accredit_info/get_user_accredit", params);
    },
    /**
     * 设置Banner图文链接
     */
    setBanner(params) {
        return get(DATA_API_URL + "mainpage/set_banner_item", params);
    },
    /**
     * 上传图片
     * @param {userId,fileData,fileType,bizType} params
     */
    fileUpload(params) {
        return fetch(DATA_URL+'mwlive/setup/file_upload.do',params)
        //return post(HC_URL + 'mms-api/file_upload', params)
    },
    /**
     * 获取h5的地址
     */
    getH5Url(params){
        return get(WX_API_URL+"index/get_view_url",params);
    },
    /**
     * 获取直播h5的信息
     */
    getH5LiveInfo(params){
        return get(DATA_API_URL+"livecenter/get_live_info",params);
    },
    /**
     * 获取直播列表
     */
    getLiveList(paras){
        return get(DATA_URL+'get_listbycreatetime.do',paras);
    },
    /**
     * 删除h5菜单
     */
    delLiveMenu(params){
        return get(DATA_API_URL+'livecenter/del_menu',params);
    },
    /**
     * 添加h5菜单
     */
    addLiveMenu(params){
        return get(DATA_API_URL+'livecenter/new_menu',params)
    },
    /**
     * 直播h5菜单排序
     */
    changeLiveMenuOrder(params){
        return get(DATA_API_URL+"livecenter/menu_sort",params);
    },
    /**
     * 保存直播公众号设置
     */
    changeLiveWX(params){
        return get(DATA_API_URL+"livecenter/set_wechat",params);
    },
    /**
     * 获取直播间公众号二维码
     */
    getWXScanner(params){
        return get(WX_API_URL+"wecha_authorization/get_qrcode_img",params);
    },
    /**
     * 保存直播客服设置
     */
    changeLiveService(params){
        return get(DATA_API_URL+"livecenter/set_service",params);
    },
    /**
     * 直播h5点赞开关
     */
    changeLivePraise(params){
        return get(DATA_API_URL+"livecenter/set_thumb",params);
    },
    /**
     * 直播h5修改菜单内容
     */
    modifyLiveMenu(params){
        return get(DATA_API_URL+"livecenter/mod_menu",params);
    },
    /**直播h5分享信封设置 */
    setLiveEnvelope(params){
        return get(DATA_API_URL+"livecenter/set_envelope",params);
    },
    /**
     * 获取点播列表
     */
    getVideoList(params){
        return get(MW_Live_API_URL+"/20/api/mwlive/vod/selectVodList.do",params);
    },
    /**
     * 获取点播间列表
     */
    getVideoList2(params){
        return get(MW_Live_API_URL+"/20/api/mwlive/vod/selectVodRoomList.do",params);
    },
    /**
     * 点播搜索接口
     * @params {userId,prom}
     */
    selectVodInfoBySearch(params){
      return get(MW_Live_API_URL+"/20/api/mwlive/vod/selectVodInfoBySearch.do",params);
    },
    /**
     * 点播筛选接口
     * @params {userId,vodSource,prom}
     */
    selectVodBySelective(params){
      return get(MW_Live_API_URL+"/20/api/mwlive/vod/selectVodBySelective.do",params);
    },
    /**
     * 获取点播信息
     */
    getVodInfo(params){
      return get(MW_Live_API_URL+"/20/api/mwlive/vod/getVodInfo.do",params);
    },
    /**
     * 编辑点播信息
     */
    updateVodInfo(params){
      return post(MW_Live_API_URL+"/20/api/mwlive/vod/updateVodInfo.do",params);
    },
    /**
     * 删除点播
     * @params {id}
     */
    deteltVodInfo(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/deteltVodInfo.do",params);
    },
    /**
     * 查询点播是否被绑定
     * @params {id}
     */
    selectVodIsBind(params){
      return get(MW_Live_API_URL+"/20/api/mwlive/vod/selectVodIsBind.do",params);
    },
    /**
     * 查询文件夹列表
     * @param{userId}
     */
    selectMediaFolderList(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/selectMediaFolderList.do",params);
    },
    /**
     * 新建文件夹
     * @param{userId,fileName,parentId}
     */
    addMediaFolder(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/addMediaFolder.do",params);
    },
    /**
     * 删除文件夹
     * @param{mediaFolderId}
     */
    deleteMediaFolderList(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/deleteMediaFolderList.do",params);
    },
    /**
     * 编辑文件夹
     * @param{id,fileName}
     */
    editMediaFolder(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/editMediaFolder.do",params);
    },
    /**
     * 移至文件夹
     * @param{id,toMediaFolderId}
     */
    updateVodPlace(params){
      return postParams(MW_Live_API_URL+"/20/api/mwlive/vod/updateVodPlace.do",params);
    },
    /**
     * 获取首页数据
     */
    getMainData(params){
        return get(DATA_API_URL+"indexcenter/get_index_data",params);
    },
    /**
     * 设置网页展示APP入口
     */
    setShowApp(params){
        return get(DATA_API_URL+"livecenter/set_show_app",params);
    },
    /**获取点播间h5信息 */
    getVideoInfo(params){
        return get(DATA_API_URL+"videocenter/get_video_info",params);
    },
    /**设置点播间h5菜单顺序 */
    setVideoMenuOrder(params){
        return get(DATA_API_URL+"videocenter/menu_sort",params);
    },
    /**删除点播间h5菜单 */
    deleteVideoMenu(params){
        return get(DATA_API_URL+"videocenter/del_menu",params);
    },
    /**更改点播间h5菜单内容 */
    modifyVideoMenu(params){
        return get(DATA_API_URL+"videocenter/mod_menu",params);
    },
    /**添加点播间h5菜单 */
    addideoMenu(params){
        return get(DATA_API_URL+"videocenter/new_menu",params);
    },
    /**设置点播间h5公众号信息 */
    setvideoWX(params){
        return get(DATA_API_URL+"videocenter/set_wechat",params);
    },
    /**设置点播间h5客服信息 */
    setvideoServe(params){
        return get(DATA_API_URL+"videocenter/set_service",params);
    },
    /**设置点播间h5分享信封信息 */
    setvideoShare(params){
        return get(DATA_API_URL+"videocenter/set_envelope",params);
    },
    /**视频截图 */
    searchList(params){
      return postParams("http://open.facebac.com/api/video/list/search_list.do",params);
    },
    /**
     * 获取品牌信息
     */
    getBrandInfo(params){
        return get(DATA_API_URL+"vboservice/get_brand_data",params);
    },
    /**
     * 设置品牌信息
     */
    setBrandInfo(params){
        return get(DATA_API_URL+"vboservice/mod_brand",params);
    },
    setPublic(params){
        return get(WX_API_URL+"index/create_index",params);
    },
    checkWX(params){
        return get(DATA_API_URL+"vboservice/is_open_wechat",params);
    },
    deleteH5Page(params){
        return get(WX_API_URL+"index/del_view",params);
    },
    // 获取微信支付权限
    getWXPay(params){
        return post
        (WX_API_URL+"wecha_pay/get_wecha_pay",params);
    },
    //设置默认微信你支付
    getActiveWXPay(params){
        return post(WX_API_URL+"wecha_pay/set_default_pay",params);
    },
    //获取用户微信支付详情
    getWxPay_info(params){
        return post(WX_API_URL+"wecha_pay/get_pay_info",params);
    },
    //获取访客统计
    getVisitorInfo(params){
        return get(DATA_API_URL+"visitrecord/visit_list",params);
    },
    //portal微信扫码支付
    getMoentWxPay(params){
        return post(WX_API_URL + "wecha_pay/native_pay",params);
    },
    //portal设置微信支付信息
    setWxPay(params){
        return post(WX_API_URL + 'wecha_pay/set_wecha_pay',params)
    },
    //首页引导接口
    setguide(params){
        return post(DATA_API_URL + 'vboservice/mod_guide' ,params)
    },
    //获取单个主页的访客数据
    setsingle(params){
        return post(DATA_API_URL + 'visitrecord/get_single_visit' ,params)
    },
    //主页预览
    homepreview(params){
        return post(WX_API_URL + 'index/open_preview' ,params)
    },
}
