export type TTheme = {
    headerH1: string,
    navItemsColor: string,
    inputValuesColor: string,
    labelColor: string,
    mainButtonsColor: string,
    secondaryButtonsColor: string,
    bgColor: string,
    actionButtonsColor: string,
    sidebarColor: string
};

export type TThemes = {
    [key: string]: TTheme;
};
