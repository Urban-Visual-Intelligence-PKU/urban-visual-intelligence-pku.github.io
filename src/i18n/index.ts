export const languages = { zh: '中文', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';

// zh lives at the site root, en under /en/.
export const langParams = [{ params: { lang: undefined } }, { params: { lang: 'en' } }];

export function getLang(param: string | undefined): Lang {
  return param === 'en' ? 'en' : 'zh';
}

export function href(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Path of the same page in the other language. */
export function switchHref(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return href(to, bare);
}

export type Localized = { en: string; zh?: string };
export function pick(field: Localized | undefined, lang: Lang): string {
  if (!field) return '';
  return (lang === 'zh' && field.zh) || field.en;
}

const ui = {
  zh: {
    'site.name': '城市视觉智能实验室',
    'site.affiliation': '北京大学 · 遥感与地理信息系统研究所',
    'site.description': '北京大学城市视觉智能实验室：用街景、遥感影像与人工智能研究城市。',
    'nav.research': '研究方向',
    'nav.projects': '项目与成果',
    'nav.people': '团队成员',
    'nav.news': '动态',
    'nav.join': '加入我们',
    'hero.title': '用影像与人工智能理解城市',
    'hero.lede':
      '我们研究城市的样貌、感受与运行方式：利用街景影像、遥感数据和多模态大模型，度量建成环境以及生活在其中的人。',
    'hero.browse': '浏览项目',
    'hero.join': '加入实验室',
    'stats.themes': '研究方向',
    'stats.projects': '项目与成果',
    'stats.members': '成员',
    'research.intro': '每个项目归属一个研究方向。点击方向即可筛选下方的项目。',
    'projects.intro': '论文、数据集、代码与演示。每个项目都列出了参与的成员。',
    'filter.theme': '方向',
    'filter.type': '类型',
    'filter.all': '全部',
    'filter.empty': '没有符合筛选条件的项目，请清除一个筛选条件。',
    'type.paper': '论文',
    'type.dataset': '数据集',
    'type.code': '代码',
    'type.demo': '演示',
    'people.intro': '点击成员查看他参与的全部项目。',
    'role.pi': '课题组负责人',
    'role.postdoc': '博士后',
    'role.phd': '博士生',
    'role.master': '硕士生',
    'role.undergrad': '本科生',
    'role.alumni': '已毕业成员',
    'member.pi': '课题组负责人',
    'member.postdoc': '博士后',
    'member.phd': '博士生',
    'member.master': '硕士生',
    'member.undergrad': '本科生',
    'member.alumni': '已毕业',
    'people.projects': '参与项目',
    'people.noProjects': '暂无已收录的项目。',
    'people.now': '现任',
    'people.email': '邮箱',
    'project.authors': '作者',
    'project.members': '实验室成员',
    'project.links': '链接',
    'project.related': '同方向的其他项目',
    'project.back': '返回项目列表',
    'link.paper': '论文',
    'link.arxiv': 'arXiv',
    'link.code': '代码',
    'link.dataset': '数据集',
    'link.demo': '演示',
    'link.project': '项目主页',
    'link.video': '视频',
    'link.homepage': '个人主页',
    'link.github': 'GitHub',
    'link.huggingface': 'Hugging Face',
    'link.scholar': 'Google Scholar',
    'link.orcid': 'ORCID',
    'join.title': '课题组正在招聘',
    'join.body':
      '课题组目前招收博士后（科研项目博士后或博雅博士后），从事地理人工智能和城市大数据方面的研究工作；同时欢迎感兴趣的本、硕、博研究生加入课题组，请通过邮件联系。',
    'join.copy': '复制邮箱',
    'join.copied': '已复制',
    'footer.address': '北京市海淀区颐和园路 5 号 北京大学遥感楼 · 100871',
    'notfound.title': '页面不存在',
    'notfound.body': '这个地址没有对应的页面。',
    'notfound.home': '回到首页',
  },
  en: {
    'site.name': 'Urban Visual Intelligence Lab',
    'site.affiliation': 'Peking University · Institute of Remote Sensing and GIS',
    'site.description':
      'Urban Visual Intelligence Lab at Peking University studies cities with street-level imagery, remote sensing and AI.',
    'nav.research': 'Research',
    'nav.projects': 'Projects',
    'nav.people': 'People',
    'nav.news': 'News',
    'nav.join': 'Join us',
    'hero.title': 'Seeing cities through images and AI',
    'hero.lede':
      'We study how cities look, feel and function, using street-level imagery, remote sensing and multimodal foundation models to measure the built environment and the people who live in it.',
    'hero.browse': 'Browse projects',
    'hero.join': 'Join the lab',
    'stats.themes': 'Themes',
    'stats.projects': 'Projects',
    'stats.members': 'Members',
    'research.intro': 'Every project belongs to one theme. Select a theme to filter the projects below.',
    'projects.intro': 'Papers, datasets, code and demos. Each project lists the lab members who built it.',
    'filter.theme': 'Theme',
    'filter.type': 'Type',
    'filter.all': 'All',
    'filter.empty': 'No projects match these filters. Clear a filter to see more.',
    'type.paper': 'Paper',
    'type.dataset': 'Dataset',
    'type.code': 'Code',
    'type.demo': 'Demo',
    'people.intro': 'Select a member to see all of their projects.',
    'role.pi': 'Principal Investigator',
    'role.postdoc': 'Postdocs',
    'role.phd': 'PhD students',
    'role.master': "Master's students",
    'role.undergrad': 'Undergraduates',
    'role.alumni': 'Alumni',
    'member.pi': 'Principal Investigator',
    'member.postdoc': 'Postdoc',
    'member.phd': 'PhD student',
    'member.master': "Master's student",
    'member.undergrad': 'Undergraduate',
    'member.alumni': 'Alumnus',
    'people.projects': 'Projects',
    'people.noProjects': 'No projects listed yet.',
    'people.now': 'Now',
    'people.email': 'Email',
    'project.authors': 'Authors',
    'project.members': 'Lab members',
    'project.links': 'Links',
    'project.related': 'More in this theme',
    'project.back': 'All projects',
    'link.paper': 'Paper',
    'link.arxiv': 'arXiv',
    'link.code': 'Code',
    'link.dataset': 'Dataset',
    'link.demo': 'Demo',
    'link.project': 'Project page',
    'link.video': 'Video',
    'link.homepage': 'Homepage',
    'link.github': 'GitHub',
    'link.huggingface': 'Hugging Face',
    'link.scholar': 'Google Scholar',
    'link.orcid': 'ORCID',
    'join.title': 'We are recruiting',
    'join.body':
      'The group is hiring postdocs (project postdocs or Boya postdocs) in GeoAI and urban big data. Undergraduate, master’s and PhD students interested in joining are welcome to get in touch by email.',
    'join.copy': 'Copy email',
    'join.copied': 'Copied',
    'footer.address': 'Remote Sensing Building, Peking University, 5 Yiheyuan Rd, Haidian, Beijing 100871',
    'notfound.title': 'Page not found',
    'notfound.body': 'There is no page at this address.',
    'notfound.home': 'Back to the homepage',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
export function useT(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui.en[key];
}
