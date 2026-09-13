export const SITE = {
  password: "ztr20720992",
  name: "周添瑞",
  shortName: "Porhead",
  nickname: "猪头肉",
  class: "27",
  location: "GUANGZHOU / CHINA",
  email: "2019875211@qq.com",
  phone: "18971882194",
  wechat: "18963972976",
  qq: "2019875211",
};

export const NAV = [
  { id: "about", label: "个人经历" },
  { id: "projects", label: "精选项目" },
  { id: "capabilities", label: "个人优势" },
  { id: "contact", label: "联系我" },
];

export const PROFILE = {
  kicker: "01 / PROFILE",
  titleA: "DESIGN",
  titleB: "THAT BECOMES",
  titleC: "PRODUCT.",
  lede:
    "玩具设计专业出身，习惯从概念出发，同时关注结构、工艺、成本与最终呈现。相比只做“效果图”，更关注一个想法能否进入实体与生产。",
  body:
    "我长期关注模型、潮玩与 IP 衍生品。在上海布鲁可科技有限公司实习期间，深度参与多个产品研发项目，覆盖 IP 监修、BOM、包装物料、工厂打样与跨部门协作。下一阶段，我希望进一步进入产品开发、IP 衍生品企划与项目管理。",
  metrics: [
    ["3 + 3", "变形金刚项目 + 新 IP 项目"],
    ["3", "深度对接模型 / 玩具企业"],
    ["200+", "模型交流活动参与人次"],
    ["150+", "大湾区高校赛事现场人数"],
  ],
  contacts: [
    { icon: "phone", label: "189 7188 2194", href: "tel:18971882194" },
    { icon: "mail", label: "2019875211@qq.com", href: "mailto:2019875211@qq.com" },
    { icon: "message", label: "微信 / 18963972976", href: "#contact" },
  ],
};

export const STRENGTHS = [
  {
    num: "01",
    title: "PRODUCT THINKING",
    copy: "先定义问题、用户与商业目标，再决定设计方向；不把画得好看当成产品成立。",
    icon: "Box",
  },
  {
    num: "02",
    title: "3D + STRUCTURE",
    copy: "Rhino / ZBrush / KeyShot 为主要工具，能把创意推进到可拆解、可验证的实体模型。",
    icon: "Cuboid",
  },
  {
    num: "03",
    title: "PROTOTYPE + COST",
    copy: "关注工艺、模具、材料、成本与损耗，能把低预算限制转化为可重复的生产方案。",
    icon: "Factory",
  },
  {
    num: "04",
    title: "IP / MERCH SENSE",
    copy: "理解角色资产、商品化与传播之间的关系，在 IP 表达和产品逻辑之间找平衡。",
    icon: "Sparkles",
  },
  {
    num: "05",
    title: "PROJECT COORDINATION",
    copy: "有社团、赛事、校企合作和真实研发实习经验，习惯推进多方沟通与项目节点。",
    icon: "Route",
  },
  {
    num: "06",
    title: "SYSTEM + SOP",
    copy: "会把一次性的工艺或创意沉淀为模板、流程和 SOP，让经验可以被团队复用。",
    icon: "Layers3",
  },
];

export const PROJECTS = [
  {
    id: "rhino-vendor",
    num: "01",
    title: "FUNCTIONAL RHINO",
    cn: "犀牛自动贩卖机 / 结构功能原型",
    meta: "STRUCTURE · MECHANISM · 3D PRINT",
    role: "个人结构设计项目",
    year: "2026",
    category: "FUNCTIONAL PROTOTYPE",
    image: "/assets/project-rhino.jpg",
    detailImage: "/assets/project-rhino.jpg",
    summary:
      "把一个结构练习对象推进成具备内部机构与外部功能闭环的实物原型，验证从建模到打印的完整过程。",
    tags: ["Rhino", "机构设计", "3D 打印", "实体验证"],
    caseStudy: [
      {
        step: "Problem",
        title: "练习对象如何成为产品原型？",
        copy: "如果只做外观，很难说明“能落地”。因此这个项目要解决：如何让一个模型真正形成内部结构与外部功能的闭环。",
      },
      {
        step: "Insight",
        title: "结构不是细节，而是产品语言",
        copy: "一个可运行的结构比一张漂亮渲染图更能证明设计判断。先从机构逻辑入手，再让外观服从结构关系。",
      },
      {
        step: "Decision",
        title: "先研究机构，再收拢成整体",
        copy: "不直接进入造型，而是依次完成内部结构研究、机构与框架拆解、整体外观建模，最后用 3D 打印验证。",
      },
      {
        step: "Design",
        title: "外观与功能互相解释",
        copy: "在 Rhino 中建立可拆解的组件系统，让外露机构、分件关系和使用方式共同构成产品表达。",
      },
      {
        step: "Prototype",
        title: "3D 打印实体验证",
        copy: "将数字模型输出为实物，检查配合、强度、打印可行性与功能表现，再根据结果回到模型修正。",
      },
      {
        step: "Result",
        title: "完成从概念到原型的闭环",
        copy: "项目不仅完成建模，也完整走通了概念、机构、打印和实体验证，形成可解释的结构设计案例。",
      },
    ],
  },
  {
    id: "horse-magnet",
    num: "02",
    title: "HORSE LAB",
    cn: "马年磁吸玩具 / 玩法与产品设计",
    meta: "PLAY · MAGNETIC · PRODUCT LOGIC",
    role: "产品设计参赛项目",
    year: "2026",
    category: "PRODUCT DESIGN",
    image: "/assets/project-horse.jpg",
    detailImage: "/assets/project-horse.jpg",
    summary:
      "以磁吸结构为核心的生肖玩具设计，让玩法、造型与装配结构共同解释“马”这个产品主题。",
    tags: ["玩法策划", "磁吸结构", "生肖 IP", "KeyShot"],
    caseStudy: [
      {
        step: "Problem",
        title: "生肖玩具如何不只做装饰？",
        copy: "生肖主题很容易变成贴标签的视觉装饰。项目要找到一种能让玩法、结构和产品身份互相支撑的表达。",
      },
      {
        step: "Insight",
        title: "玩法是最好的产品说明书",
        copy: "磁吸拆装可以自然地解释“马”的部件关系，用户通过动作理解结构，而不是靠大段说明。",
      },
      {
        step: "Decision",
        title: "以磁吸结构作为产品核心",
        copy: "把拆解、组合、重新构成马的形态设为第一层产品逻辑，再围绕连接点完成外观与内部装配设计。",
      },
      {
        step: "Design",
        title: "造型、玩法、结构互相说明",
        copy: "保留马的识别度，同时预留隐藏磁吸位和装配逻辑，让每个部件都有造型与功能双重角色。",
      },
      {
        step: "Prototype",
        title: "3D 建模与渲染验证",
        copy: "用 Rhino 建立分件结构，通过 KeyShot 检查体量、配色与展示状态，验证拆装后的完整形态。",
      },
      {
        step: "Result",
        title: "中国马镇玩偶设计大赛优秀奖",
        copy: "作品获“中国马镇度假区玩偶设计大赛”优秀奖（前十名），验证了从玩法到产品表现的完整思路。",
      },
    ],
  },
  {
    id: "club-badge",
    num: "03",
    title: "BADGE / SOP",
    cn: "社团徽章 / 低成本产品化实验",
    meta: "MATERIAL · MOLD · REPEATABLE",
    role: "个人产品化实验",
    year: "2026",
    category: "PRODUCTIZATION",
    image: "/assets/project-club-badge.jpg",
    detailImage: "/assets/project-club-badge.jpg",
    summary:
      "在资金与设备有限的条件下，通过材料、模具和配比的四轮实验，把徽章做成可稳定复制的低成本衍生品。",
    tags: ["石膏翻模", "硅胶模具", "材料配比", "SOP"],
    caseStudy: [
      {
        step: "Problem",
        title: "没有预算时，衍生品怎么落地？",
        copy: "金属徽章与亚克力产品需要更高成本。项目要测试一条低成本、可重复、可交给多人执行的小批量路线。",
      },
      {
        step: "Insight",
        title: "工艺问题也是产品决策",
        copy: "不是把翻模当手工艺展示，而是把材料强度、细节保留、操作时间和损耗当成产品参数来优化。",
      },
      {
        step: "Decision",
        title: "用试错替换“一步到位”",
        copy: "从 β 石膏起步，逐轮加入 425 水泥并更换为 α 石膏，配合硅胶模具与 SLA 母模不断修正。",
      },
      {
        step: "Design",
        title: "为翻模条件重新设计母模",
        copy: "保留徽章主要识别信息，同时针对翻模强度、气泡、薄厚和后期上色重新调整细部。",
      },
      {
        step: "Prototype",
        title: "四轮失败与配比收敛",
        copy: "经历断槽、开裂、气泡、操作时间过短等问题，最终固定石膏与水泥的比例及加水量。",
      },
      {
        step: "Result",
        title: "0.35 元 / 个，10 分钟稳定产出",
        copy: "单件材料成本约 0.35 元，稳定制作节奏约 10 分钟一个，并沉淀为可复用的生产 SOP。",
      },
    ],
  },
  {
    id: "club-identity",
    num: "04",
    title: "G.U.M.A. SYSTEM",
    cn: "协会视觉识别 / 七轮设计决策",
    meta: "IDENTITY · ITERATION · SYSTEM",
    role: "协会视觉系统项目",
    year: "2026",
    category: "VISUAL IDENTITY",
    image: "/assets/project-club-logo.jpg",
    detailImage: "/assets/project-club-logo.jpg",
    summary:
      "从学校校标、机娘角色与地下模型社团气质出发，经过七轮取舍，建立一套有明确决策逻辑的协会视觉识别。",
    tags: ["Logo 迭代", "IP 角色", "协会品牌", "视觉系统"],
    caseStudy: [
      {
        step: "Problem",
        title: "如何让一个地下协会被快速识别？",
        copy: "需要同时处理学校符号、模型社团属性、机娘角色和成员期待，不能把元素简单堆在一起。",
      },
      {
        step: "Insight",
        title: "识别度来自取舍，不来自叠加",
        copy: "元素越多，信息密度越高，越不像一个能被记住的标识。要保留最有记忆点的关系，其余内容删掉。",
      },
      {
        step: "Decision",
        title: "用七轮反馈替代一次性定稿",
        copy: "从提取校标翅膀，到机娘造型、流道元素、朝向、色彩和构图平衡，每一步都围绕真实问题调整。",
      },
      {
        step: "Design",
        title: "建立角色与符号的双重识别",
        copy: "最终版保留校徽翅膀与机娘亲和感，去除过度常见的流道套路，让角色比例和画面重心更平衡。",
      },
      {
        step: "Prototype",
        title: "多版本对照与成员反馈",
        copy: "保留两个正式版本，并延伸亚克力挂扣、立牌、色纸和徽章等衍生物料，验证跨媒介表现。",
      },
      {
        step: "Result",
        title: "形成可使用的协会正式视觉",
        copy: "Logo 与衍生品体系被作为协会正式视觉使用，完整记录为什么改、依据什么改。",
      },
    ],
  },
  {
    id: "club-newspaper",
    num: "05",
    title: "UNDERGROUND PRESS",
    cn: "招新报纸 / 传播物料产品化",
    meta: "EDITORIAL · PRINT · COMMUNICATION",
    role: "宣传物料设计",
    year: "2026",
    category: "COMMUNICATION",
    image: "/assets/project-club-paper.jpg",
    detailImage: "/assets/project-club-paper.jpg",
    summary:
      "把招新物料当成一个信息产品：用广式视觉、通缉令式首页和报纸式信息结构，完成从版式到实物的传播闭环。",
    tags: ["报纸结构", "广式视觉", "印刷落地", "传播物料"],
    caseStudy: [
      {
        step: "Problem",
        title: "招新物料如何被认真读完？",
        copy: "普通海报只能传递一两句信息。协会需要一种能承载更多内容、同时符合“地下协会”调性的传播媒介。",
      },
      {
        step: "Insight",
        title: "媒介本身可以成为品牌语言",
        copy: "报纸的信息密度、折叠关系、纸张触感和复古气质，都比一张海报更贴合协会内容与传播场景。",
      },
      {
        step: "Decision",
        title: "用广式报纸结构组织内容",
        copy: "学校在广州，因此外页借鉴茶餐厅广式风格；首页参考通缉令排版，内页用深红与深绿建立版面系统。",
      },
      {
        step: "Design",
        title: "从报纸气质倒推信息删减",
        copy: "大量图片和斜排会让设计脱离报纸感。删去多余内容，保留报道式排布、米黄底色与清晰折叠关系。",
      },
      {
        step: "Prototype",
        title: "从报纸纸调整到哑光铜版纸",
        copy: "为赶上上海模型赛，实际印刷改用颜色更鲜艳、纸张更厚实的哑光铜版纸，并用底色模拟旧报纸氧化感。",
      },
      {
        step: "Result",
        title: "完成一份可折叠的实物传播物料",
        copy: "最终交付外页、内页与实物印刷，验证从创意、版式、材料到实际传播的完整链路。",
      },
    ],
  },
  {
    id: "ip-visual",
    num: "06",
    title: "IP / VISUAL LAB",
    cn: "IP 与场景视觉 / 造型能力补充",
    meta: "IP · CHARACTER · SCENE",
    role: "个人视觉与建模项目",
    year: "2025—2026",
    category: "IP & VISUAL",
    image: "/assets/project-marin.jpg",
    detailImage: "/assets/project-marin.jpg",
    summary:
      "通过机甲角色、系列潮玩和 1:40 场景模型，补足 IP 理解、角色造型与三维视觉表达能力。",
    tags: ["MARIN", "系列潮玩", "场景模型", "角色造型"],
    caseStudy: [
      {
        step: "Problem",
        title: "如何证明 IP 与 3D 视觉能力？",
        copy: "目标岗位不是纯视觉设计，但造型能力仍然是产品表达的基础。需要一组不喧宾夺主、又能补足能力的作品。",
      },
      {
        step: "Insight",
        title: "创意要服务于角色、产品与传播",
        copy: "IP 视觉不是独立画面，而是识别度、商品化、场景和传播关系的组合。",
      },
      {
        step: "Decision",
        title: "用三类作品覆盖能力边界",
        copy: "选择机甲角色 MARIN、性格各异的小兔子系列潮玩，以及 1:40 场景模型，分别验证角色、产品与场景能力。",
      },
      {
        step: "Design",
        title: "强化角色差异与产品语境",
        copy: "在角色比例、表情、配色和部件语言上做差异，让每个 IP 都能形成独立的识别记忆点。",
      },
      {
        step: "Prototype",
        title: "3D 建模、渲染与实体后道",
        copy: "场景模型从数字资产推进到 3D 打印、手绘贴图与涂装后道，验证从屏幕到实物的表现。",
      },
      {
        step: "Result",
        title: "形成一组可调用的 IP 视觉资产",
        copy: "作品可作为 IP 方向、潮玩方向与场景模型方向的辅助证明，支撑后续产品概念表达。",
      },
    ],
  },
];

export const SECTIONS = ["hero", "about", "projects", "capabilities", "contact"];
