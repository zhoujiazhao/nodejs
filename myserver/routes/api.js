//注册或登录
const getUid = '/api/portal/index/getUid',
    //主域名
    https = "http://www.zhoujiazhao.com:3344",
    //活动支付结果
    returnPay = '/api/portal/activity/returnPay',
    //基本资料类型查看
    registerBase = '/api/user/register/registerBase',
    //我的活动
    activityIndex = '/api/portal/activity/index',
    //活动页面详情
    activityDetails = '/api/portal/activity/activityDetails',
    //参加活动
    activityPay = '/api/portal/activity/activityPay',
    //约吧首页
    barIndex = '/api/portal/bar/index',
    //删除兴趣爱好
    myHobbyDel = '/api/user/user/myHobbyDel',
    //约吧详情
    barDetail = '/api/portal/bar/barDetails',
    //查看约吧地图
    barMap = '/api/portal/bar/map',
    //约吧最近活动
    activityNewest = '/api/portal/bar/activityNewest',
    //认证信息提交
    registerPost = '/api/user/register/registerPost',
    //注册协议
    registerRead = '/api/user/register/registerRead',
    //填写基本资料
    registerTwo = '/api/user/register/registerTwo',
    //首页滑一滑数据
    index = '/api/portal/index/index',
    //个人中心接口
    myCenter = '/api/user/user/myCenter',
    //存微信头像
    start = '/api/portal/index/start',
    //发送手机验证码
    sms = '/api/user/register/sms',
    //认证费用说明
    registerExplain = '/api/user/register/registerExplain',
    //认证描述页面
    registerDescription = '/api/user/register/registerDescription',
    //滑动接口
    select = '/api/portal/index/select',
    //生命密码解析
    analysis = '/api/user/user/analysis',
    //生命密码解析提交申请
    analysisPost = '/api/user/user/analysisPost',
    //教师服务经验提交
    teacherPost = '/api/user/user/teacherPost',
    //联系我们
    contactUs = '/api/user/user/contactUs',
    //报名过的历史活动
    activityList = '/api/user/user/activityList',
    //我的认证
    myCheck = '/api/user/user/myCheck',
    //已读消息
    mailBoxOld = '/api/portal/letter/mailBoxOld',
    //未读消息
    mailBoxNew = '/api/portal/letter/mailBoxNew',
    //点击我知道了
    registerKnow = '/api/user/register/registerKnow',
    //我的兴趣爱好
    myHobby = '/api/user/user/myHobby',
    //兴趣爱好提交
    myHobbyAdd = '/api/user/user/myHobbyAdd',
    //上传图片
    imgUpdate = '/portal/Upload/uploadToQiniu',
    //我的信箱系统信息列表
    msgList = '/api/portal/letter/msgList',
    //我的信箱
    letterLog = '/api/portal/letter/letterLog',
    //回复消息
    letterReply = '/api/portal/letter/letterReply',
    //详情页基本资料
    MemberBase = '/api/portal/index/MemberBase',
    //我的基本心信息
    userInfo = '/api/user/user/userInfo',
    //我的择偶标准
    myLove = '/api/user/user/myLove',
    //我的基本消息提交处理
    userPost = '/api/user/user/userPost',
    //兴趣爱好
    hobby = '/api/portal/index/hobby',
    //我的择偶资料处理
    myLovePost = '/api/user/user/myLovePost',
    //详情页
    MemberDetail = '/api/portal/index/MemberDetail',
    //查看套餐
    chat = '/api/user/register/chat',
    //购买畅聊套餐
    payChat = '/api/user/register/payChat',
    //删除消息
    infoDel = '/api/portal/letter/infoDel',
    //判断是否能写信
    letter = '/api/portal/letter/letter',
    //择偶标准
    spouse = '/api/portal/index/spouse',
    //验证码验证
    registerOne = '/api/user/register/registerOne'