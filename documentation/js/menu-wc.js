'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-typecript-mongodb-complexe documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' :
                                            'id="xs-controllers-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' :
                                        'id="xs-injectables-links-module-AuthModule-443356a099f9bd47635cd728fd7beaf24f0f069015234ae3748da86812fe5f4229cb67e4c93ec890acf0f14a6f6ec4fba277d0c40094f8b513e41d905b9e0355"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailHelper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailHelper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookerEmployeesModule.html" data-type="entity-link" >BookerEmployeesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' : 'data-bs-target="#xs-controllers-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' :
                                            'id="xs-controllers-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' }>
                                            <li class="link">
                                                <a href="controllers/BookerEmployeesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookerEmployeesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' : 'data-bs-target="#xs-injectables-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' :
                                        'id="xs-injectables-links-module-BookerEmployeesModule-3baa2b43a8efe9be7a2cd0297d16be4d2a632227b49acdf3cca74a74ed38719827e525ade53b8d36e5f570f5f7c6efbce3293a3c4f7cd1cea12ab2309024db22"' }>
                                        <li class="link">
                                            <a href="injectables/BookerEmployeesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookerEmployeesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientsModule.html" data-type="entity-link" >ClientsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' : 'data-bs-target="#xs-controllers-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' :
                                            'id="xs-controllers-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' }>
                                            <li class="link">
                                                <a href="controllers/ClientsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' : 'data-bs-target="#xs-injectables-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' :
                                        'id="xs-injectables-links-module-ClientsModule-5e8790b9ac759790ca72e33bb12da4c5c685bd05b199c3add22a69de2b542c412265904200d2427d96730e8849cc70f84324dee881523b477a8a81fce4fa638c"' }>
                                        <li class="link">
                                            <a href="injectables/ClientsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeesModule.html" data-type="entity-link" >EmployeesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' : 'data-bs-target="#xs-controllers-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' :
                                            'id="xs-controllers-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' }>
                                            <li class="link">
                                                <a href="controllers/EmployeesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' : 'data-bs-target="#xs-injectables-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' :
                                        'id="xs-injectables-links-module-EmployeesModule-432d054162689ca34f2bfe4905cfa555ba1627eddf09c5236b24c160eea60f5e46366617b0f25297b225cbf3abc87be16f25fc876bd7bae81a991ff53755572d"' }>
                                        <li class="link">
                                            <a href="injectables/EmployeesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmployeesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EstablishmentsModule.html" data-type="entity-link" >EstablishmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' : 'data-bs-target="#xs-controllers-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' :
                                            'id="xs-controllers-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' }>
                                            <li class="link">
                                                <a href="controllers/EstablishmentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' : 'data-bs-target="#xs-injectables-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' :
                                        'id="xs-injectables-links-module-EstablishmentsModule-09793ce216a54fd6dd28b51160c71ff8c3a56a188918fe4f7665d18293ebdef770b3ee7c375475a436198c0f51d1d1214d870cb22618b28f62a8b9c2f5c5c32c"' }>
                                        <li class="link">
                                            <a href="injectables/EstablishmentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EstablishmentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JwtModule.html" data-type="entity-link" >JwtModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LogsModule-cbb157496c23d2a054a021434d69f160981232360226f0e2a23ae815b2d93ec538ecfbde9f792fc53f029d2e70fa7de8888abb2aef244df40c19d09e590d2c95"' : 'data-bs-target="#xs-injectables-links-module-LogsModule-cbb157496c23d2a054a021434d69f160981232360226f0e2a23ae815b2d93ec538ecfbde9f792fc53f029d2e70fa7de8888abb2aef244df40c19d09e590d2c95"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogsModule-cbb157496c23d2a054a021434d69f160981232360226f0e2a23ae815b2d93ec538ecfbde9f792fc53f029d2e70fa7de8888abb2aef244df40c19d09e590d2c95"' :
                                        'id="xs-injectables-links-module-LogsModule-cbb157496c23d2a054a021434d69f160981232360226f0e2a23ae815b2d93ec538ecfbde9f792fc53f029d2e70fa7de8888abb2aef244df40c19d09e590d2c95"' }>
                                        <li class="link">
                                            <a href="injectables/LogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-65ab79397949d1a975834516510f2fb49ebea084668b1fbb2fbf72bc6f3a4bf342e13ee6093d0fd8d235ffb99f23178f13c5746caf086c488cd848a493b8ac2d"' : 'data-bs-target="#xs-injectables-links-module-MailModule-65ab79397949d1a975834516510f2fb49ebea084668b1fbb2fbf72bc6f3a4bf342e13ee6093d0fd8d235ffb99f23178f13c5746caf086c488cd848a493b8ac2d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-65ab79397949d1a975834516510f2fb49ebea084668b1fbb2fbf72bc6f3a4bf342e13ee6093d0fd8d235ffb99f23178f13c5746caf086c488cd848a493b8ac2d"' :
                                        'id="xs-injectables-links-module-MailModule-65ab79397949d1a975834516510f2fb49ebea084668b1fbb2fbf72bc6f3a4bf342e13ee6093d0fd8d235ffb99f23178f13c5746caf086c488cd848a493b8ac2d"' }>
                                        <li class="link">
                                            <a href="injectables/MailHelper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailHelper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MongooseConfig.html" data-type="entity-link" >MongooseConfig</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationsModule.html" data-type="entity-link" >OrganizationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' : 'data-bs-target="#xs-controllers-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' :
                                            'id="xs-controllers-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' }>
                                            <li class="link">
                                                <a href="controllers/OrganizationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' : 'data-bs-target="#xs-injectables-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' :
                                        'id="xs-injectables-links-module-OrganizationsModule-eed5c0934dbc68f0a7ca13fe73d629da657dc46a7880de1fb85fc60319f5204e290ae80de8f53cb05cabd9353d16d7f30cd572665d829263daa599e34208787b"' }>
                                        <li class="link">
                                            <a href="injectables/OrganizationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlanPricesModule.html" data-type="entity-link" >PlanPricesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' : 'data-bs-target="#xs-controllers-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' :
                                            'id="xs-controllers-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' }>
                                            <li class="link">
                                                <a href="controllers/PlanPricesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanPricesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' : 'data-bs-target="#xs-injectables-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' :
                                        'id="xs-injectables-links-module-PlanPricesModule-62b770c5a3dbe0305f284f91ab15525f49d0fded02453f11d077e9e361311de03b320b4835bce8c567335ffc10857a122c2f82afb661d8b8203f94397ad9529e"' }>
                                        <li class="link">
                                            <a href="injectables/PlanPricesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlanPricesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlansModule.html" data-type="entity-link" >PlansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' : 'data-bs-target="#xs-controllers-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' :
                                            'id="xs-controllers-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' }>
                                            <li class="link">
                                                <a href="controllers/PlansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' : 'data-bs-target="#xs-injectables-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' :
                                        'id="xs-injectables-links-module-PlansModule-ef2b1ab55dbccafe115266c9d19eb8cfad189ad360cc95b1402c20bc6d0cde1842bcb60b30cd82cb031a7613265bea62bdc3c00661ab21cf8c684ab476ef10a6"' }>
                                        <li class="link">
                                            <a href="injectables/PlansService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlansService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PromoCodesModule.html" data-type="entity-link" >PromoCodesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' : 'data-bs-target="#xs-controllers-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' :
                                            'id="xs-controllers-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' }>
                                            <li class="link">
                                                <a href="controllers/PromoCodesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PromoCodesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' : 'data-bs-target="#xs-injectables-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' :
                                        'id="xs-injectables-links-module-PromoCodesModule-9397df265e4806e8ccc0cf55ed33c6c622b444757a3772a35e4a4efc01aead09f18b144c30f09fced3577903de59bc2b4d6a8f4f1b32daabe55c1b89a821e2fd"' }>
                                        <li class="link">
                                            <a href="injectables/PromoCodesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PromoCodesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeModule.html" data-type="entity-link" >StripeModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StripeModule-a5dfc4eb5adc3ea75964cda2950a68cec0e36ba6f57f19d6c7ad2ab343a2273548c4d8294a0f1d6d0c046e84e6ab4b7de8f197d9d04b9d2b671c55697a77fc12"' : 'data-bs-target="#xs-injectables-links-module-StripeModule-a5dfc4eb5adc3ea75964cda2950a68cec0e36ba6f57f19d6c7ad2ab343a2273548c4d8294a0f1d6d0c046e84e6ab4b7de8f197d9d04b9d2b671c55697a77fc12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StripeModule-a5dfc4eb5adc3ea75964cda2950a68cec0e36ba6f57f19d6c7ad2ab343a2273548c4d8294a0f1d6d0c046e84e6ab4b7de8f197d9d04b9d2b671c55697a77fc12"' :
                                        'id="xs-injectables-links-module-StripeModule-a5dfc4eb5adc3ea75964cda2950a68cec0e36ba6f57f19d6c7ad2ab343a2273548c4d8294a0f1d6d0c046e84e6ab4b7de8f197d9d04b9d2b671c55697a77fc12"' }>
                                        <li class="link">
                                            <a href="injectables/StripePriceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StripePriceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscriptionsModule.html" data-type="entity-link" >SubscriptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' : 'data-bs-target="#xs-controllers-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' :
                                            'id="xs-controllers-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' }>
                                            <li class="link">
                                                <a href="controllers/SubscriptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' : 'data-bs-target="#xs-injectables-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' :
                                        'id="xs-injectables-links-module-SubscriptionsModule-17131d988657d5ebc26b5d1021b107acee4c6020cb96d4b8d3687e958afe7040c667bdc665f50a1c7a324b922b9581030b18dfe108038c10b9b94bc53960305f"' }>
                                        <li class="link">
                                            <a href="injectables/SubscriptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsModule.html" data-type="entity-link" >TeamsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' : 'data-bs-target="#xs-controllers-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' :
                                            'id="xs-controllers-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' }>
                                            <li class="link">
                                                <a href="controllers/TeamsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' : 'data-bs-target="#xs-injectables-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' :
                                        'id="xs-injectables-links-module-TeamsModule-0a40d7d41ecfa4f0d90dd50e6f45018e1166cfc55ceb32bd5bc3c81699269bffd2f4de60970b39d9f1606e5f11daf72c1432f3ee29b9b9d7e532b36c1df52b94"' }>
                                        <li class="link">
                                            <a href="injectables/TeamsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ThrottlerConfig.html" data-type="entity-link" >ThrottlerConfig</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' :
                                            'id="xs-controllers-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' :
                                        'id="xs-injectables-links-module-UsersModule-bfb7a7053e726e3ebff92b266dc0c2f891edddbc58de6ccb29a377b767c4a854a9382b1be253d88851eb940396ae173fd0931b02d0407e5000128691fdaa6cfe"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BookerEmployeesController.html" data-type="entity-link" >BookerEmployeesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClientsController.html" data-type="entity-link" >ClientsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmployeesController.html" data-type="entity-link" >EmployeesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EstablishmentsController.html" data-type="entity-link" >EstablishmentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrganizationsController.html" data-type="entity-link" >OrganizationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlanPricesController.html" data-type="entity-link" >PlanPricesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlansController.html" data-type="entity-link" >PlansController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PromoCodesController.html" data-type="entity-link" >PromoCodesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscriptionsController.html" data-type="entity-link" >SubscriptionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TeamsController.html" data-type="entity-link" >TeamsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BookerEmployee.html" data-type="entity-link" >BookerEmployee</a>
                            </li>
                            <li class="link">
                                <a href="classes/Client.html" data-type="entity-link" >Client</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthClientDto.html" data-type="entity-link" >CreateAuthClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthOrganizationDto.html" data-type="entity-link" >CreateAuthOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookerEmployeeDto.html" data-type="entity-link" >CreateBookerEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateClientDto.html" data-type="entity-link" >CreateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEmployeeDto.html" data-type="entity-link" >CreateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEstablishmentDto.html" data-type="entity-link" >CreateEstablishmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLogDto.html" data-type="entity-link" >CreateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrganizationDto.html" data-type="entity-link" >CreateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlanDto.html" data-type="entity-link" >CreatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlanPriceDto.html" data-type="entity-link" >CreatePlanPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePromoCodeDto.html" data-type="entity-link" >CreatePromoCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriptionDto.html" data-type="entity-link" >CreateSubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTeamDto.html" data-type="entity-link" >CreateTeamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomFieldDto.html" data-type="entity-link" >CustomFieldDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomFieldValueDto.html" data-type="entity-link" >CustomFieldValueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link" >Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/Establishment.html" data-type="entity-link" >Establishment</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlagDto.html" data-type="entity-link" >FlagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordDto.html" data-type="entity-link" >ForgotPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalExceptionFilter.html" data-type="entity-link" >GlobalExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hash.html" data-type="entity-link" >Hash</a>
                            </li>
                            <li class="link">
                                <a href="classes/Log.html" data-type="entity-link" >Log</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogHelper.html" data-type="entity-link" >LogHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationHelper.html" data-type="entity-link" >NotificationHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberHelper.html" data-type="entity-link" >NumberHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Organization.html" data-type="entity-link" >Organization</a>
                            </li>
                            <li class="link">
                                <a href="classes/Plan.html" data-type="entity-link" >Plan</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlanPrice.html" data-type="entity-link" >PlanPrice</a>
                            </li>
                            <li class="link">
                                <a href="classes/PromoCode.html" data-type="entity-link" >PromoCode</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Responses.html" data-type="entity-link" >Responses</a>
                            </li>
                            <li class="link">
                                <a href="classes/SecurityHelper.html" data-type="entity-link" >SecurityHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringHelper.html" data-type="entity-link" >StringHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/StripeCustomerProps.html" data-type="entity-link" >StripeCustomerProps</a>
                            </li>
                            <li class="link">
                                <a href="classes/StripePriceProps.html" data-type="entity-link" >StripePriceProps</a>
                            </li>
                            <li class="link">
                                <a href="classes/StripeProductProps.html" data-type="entity-link" >StripeProductProps</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscription.html" data-type="entity-link" >Subscription</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link" >Team</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthClientDto.html" data-type="entity-link" >UpdateAuthClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBookerEmployeeDto.html" data-type="entity-link" >UpdateBookerEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateClientDto.html" data-type="entity-link" >UpdateClientDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEmployeeDto.html" data-type="entity-link" >UpdateEmployeeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEstablishmentDto.html" data-type="entity-link" >UpdateEstablishmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLogDto.html" data-type="entity-link" >UpdateLogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrganizationDto.html" data-type="entity-link" >UpdateOrganizationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlanDto.html" data-type="entity-link" >UpdatePlanDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlanPriceDto.html" data-type="entity-link" >UpdatePlanPriceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePromoCodeDto.html" data-type="entity-link" >UpdatePromoCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriptionDto.html" data-type="entity-link" >UpdateSubscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTeamDto.html" data-type="entity-link" >UpdateTeamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthMiddleware.html" data-type="entity-link" >AuthMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BookerEmployeesService.html" data-type="entity-link" >BookerEmployeesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientsService.html" data-type="entity-link" >ClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomValidationPipe.html" data-type="entity-link" >CustomValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmployeesService.html" data-type="entity-link" >EmployeesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EstablishmentsService.html" data-type="entity-link" >EstablishmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogsService.html" data-type="entity-link" >LogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailHelper.html" data-type="entity-link" >MailHelper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationsService.html" data-type="entity-link" >OrganizationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlanPricesService.html" data-type="entity-link" >PlanPricesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlansService.html" data-type="entity-link" >PlansService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PromoCodesService.html" data-type="entity-link" >PromoCodesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeCustomerService.html" data-type="entity-link" >StripeCustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripePlanService.html" data-type="entity-link" >StripePlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripePlanService-1.html" data-type="entity-link" >StripePlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripePlanService-2.html" data-type="entity-link" >StripePlanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripePriceService.html" data-type="entity-link" >StripePriceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StripeProductService.html" data-type="entity-link" >StripeProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionsService.html" data-type="entity-link" >SubscriptionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamsService.html" data-type="entity-link" >TeamsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThrottlerBehindProxyGuard.html" data-type="entity-link" >ThrottlerBehindProxyGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Token.html" data-type="entity-link" >Token</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseProps.html" data-type="entity-link" >BaseProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmAccountClientProps.html" data-type="entity-link" >ConfirmAccountClientProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmAccountOrganizationProps.html" data-type="entity-link" >ConfirmAccountOrganizationProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InitPasswordProps.html" data-type="entity-link" >InitPasswordProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/logProps.html" data-type="entity-link" >logProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MailProps.html" data-type="entity-link" >MailProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResetPasswordProps.html" data-type="entity-link" >ResetPasswordProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponsesProps.html" data-type="entity-link" >ResponsesProps</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});