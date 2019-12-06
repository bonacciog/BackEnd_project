class Company{
    constructor(Name, WebSiteURL, LinkedinProfileURL, Industries_ID, CompanyTypes_ID, CompanySizes_ID){
        this.name = Name;
        this.webSiteURL = WebSiteURL;
        this.linkedinProfileURL = LinkedinProfileURL;
        this.industries_ID = Industries_ID;
        this.companySizes_ID = CompanySizes_ID;
        this.companyTypes_ID = CompanyTypes_ID;
    }

    get getName(){
        return this.name;
    }

    get getWebSiteURL(){
        return this.webSiteURL;
    }

    get getLinkedinProfileURL(){
        return this.linkedinProfileURL;
    }

    get getIndustry(){
        return this.industries_ID;
    }

    get getCompanySize(){
        return this.companySizes_ID;
    }

    get getCompanyType(){
        return this.companyTypes_ID
    }

    get getID() {
        return this.ID;
    }

    get getLogoPath(){
        return this.logo_path;
    }

    /**
     * @param {any} logo_path
     */
    set setLogoPath(logo_path){
        this.logo_path=logo_path;
    }

    /**
     * @param {number} XP
     */
    set setID(ID){
        this.ID=ID;
    }

    /**
     * @param {any} name
     */
    set setName(name){
        this.name=name;
    }

    /**
     * @param {any} webSiteURL
     */
    set setWebSiteURL(webSiteURL){
        this.webSiteURL=webSiteURL;
    }

    /**
     * @param {any} linkedinProfileURL
     */
    set setLinkedinProfileURL(linkedinProfileURL){
        this.linkedinProfileURL=linkedinProfileURL;
    }

    /**
     * @param {any} industries_ID
     */
    set setIndustry(industries_ID){
        this.industries_ID=industries_ID;
    }

    /**
     * @param {any} companySizes_ID
     */
    set setCompanySize(companySizes_ID){
        this.companySizes_ID=companySizes_ID;
    }

    /**
     * @param {any} companyTypes_ID
     */
    set setCompanyType(companyTypes_ID){
        this.companyTypes_ID=companyTypes_ID;
    }
}

exports.Company = Company;