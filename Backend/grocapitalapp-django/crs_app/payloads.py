def consumer_credit_score_payload_new(first_name, last_name, address, city, country_code, postal_code, state_code, ssn):
    return f'<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" xmlns:p2="http://www.w3.org/1999/xlink" xmlns:p3="inetapi/MISMO3_4_MCL_Extension.xsd" MessageType="Request">\
        <ABOUT_VERSIONS>\
        <ABOUT_VERSION>\
        <DataVersionIdentifier>201703</DataVersionIdentifier>\
        </ABOUT_VERSION>\
        </ABOUT_VERSIONS>\
        <DEAL_SETS>\
        <DEAL_SET>\
        <DEALS>\
        <DEAL>\
        <PARTIES>\
        <PARTY p2:label="Party1">\
        <INDIVIDUAL>\
        <NAME>\
        <FirstName>{first_name}</FirstName>\
        <LastName>{last_name}</LastName>\
        <MiddleName />\
        <SuffixName />\
        </NAME>\
        </INDIVIDUAL>\
        <ROLES>\
        <ROLE>\
        <BORROWER>\
        <RESIDENCES>\
        <RESIDENCE>\
        <ADDRESS>\
        <AddressLineText>{address}</AddressLineText>\
        <CityName>{city}</CityName>\
        <CountryCode>{country_code}</CountryCode>\
        <PostalCode>{postal_code}</PostalCode>\
        <StateCode>{state_code}</StateCode>\
        </ADDRESS>\
        <RESIDENCE_DETAIL>\
        <BorrowerResidencyType>Current</BorrowerResidencyType>\
        </RESIDENCE_DETAIL>\
        </RESIDENCE>\
        </RESIDENCES>\
        </BORROWER>\
        <ROLE_DETAIL>\
        <PartyRoleType>Borrower</PartyRoleType>\
        </ROLE_DETAIL>\
        </ROLE>\
        </ROLES>\
        <TAXPAYER_IDENTIFIERS>\
        <TAXPAYER_IDENTIFIER>\
        <TaxpayerIdentifierType>SocialSecurityNumber</TaxpayerIdentifierType>\
        <TaxpayerIdentifierValue>{ssn}</TaxpayerIdentifierValue>\
        </TAXPAYER_IDENTIFIER>\
        </TAXPAYER_IDENTIFIERS>\
        </PARTY>\
        </PARTIES>\
        <RELATIONSHIPS>\
        <!--  Link borrower to the service  -->\
        <RELATIONSHIP p2:arcrole="urn:fdc:Meridianlink.com:2017:mortgage/PARTY_IsVerifiedBy_SERVICE" p2:from="Party1" p2:to="Service1"/>\
        </RELATIONSHIPS>\
        <SERVICES>\
        <SERVICE p2:label="Service1">\
        <CREDIT>\
        <CREDIT_REQUEST>\
        <CREDIT_REQUEST_DATAS>\
        <CREDIT_REQUEST_DATA>\
        <CREDIT_REPOSITORY_INCLUDED>\
        <CreditRepositoryIncludedEquifaxIndicator>true</CreditRepositoryIncludedEquifaxIndicator>\
        <CreditRepositoryIncludedExperianIndicator>true</CreditRepositoryIncludedExperianIndicator>\
        <CreditRepositoryIncludedTransUnionIndicator>true</CreditRepositoryIncludedTransUnionIndicator>\
        <EXTENSION>\
        <OTHER>\
        <p3:RequestEquifaxScore>true</p3:RequestEquifaxScore>\
        <p3:RequestExperianFraud>true</p3:RequestExperianFraud>\
        <p3:RequestExperianScore>true</p3:RequestExperianScore>\
        <p3:RequestTransUnionFraud>true</p3:RequestTransUnionFraud>\
        <p3:RequestTransUnionScore>true</p3:RequestTransUnionScore>\
        </OTHER>\
        </EXTENSION>\
        </CREDIT_REPOSITORY_INCLUDED>\
        <CREDIT_REQUEST_DATA_DETAIL>\
        <CreditReportRequestActionType>Submit</CreditReportRequestActionType>\
        </CREDIT_REQUEST_DATA_DETAIL>\
        </CREDIT_REQUEST_DATA>\
        </CREDIT_REQUEST_DATAS>\
        </CREDIT_REQUEST>\
        </CREDIT>\
        <SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_REQUEST>\
        <SERVICE_PRODUCT_DETAIL>\
        <ServiceProductDescription>CreditOrder</ServiceProductDescription>\
        <EXTENSION>\
        <OTHER>\
        <!--  Recommend requesting only the formats you need, to minimize processing time  -->\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        <p3:PreferredResponseFormatType>Xml</p3:PreferredResponseFormatType>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        </OTHER>\
        </EXTENSION>\
        </SERVICE_PRODUCT_DETAIL>\
        </SERVICE_PRODUCT_REQUEST>\
        </SERVICE_PRODUCT>\
        </SERVICE>\
        </SERVICES>\
        </DEAL>\
        </DEALS>\
        </DEAL_SET>\
        </DEAL_SETS>\
        </MESSAGE>'


def consumer_credit_score_payload_retrieve(first_name, last_name, vendor_order_identifier, ssn):
    return f'<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" xmlns:p2="http://www.w3.org/1999/xlink" xmlns:p3="inetapi/MISMO3_4_MCL_Extension.xsd" MessageType="Request">\
        <ABOUT_VERSIONS>\
        <ABOUT_VERSION>\
        <DataVersionIdentifier>201703</DataVersionIdentifier>\
        </ABOUT_VERSION>\
        </ABOUT_VERSIONS>\
        <DEAL_SETS>\
        <DEAL_SET>\
        <DEALS>\
        <DEAL>\
        <PARTIES>\
        <PARTY p2:label="Party1">\
        <INDIVIDUAL>\
        <NAME>\
        <FirstName>{first_name}</FirstName>\
        <LastName>{last_name}</LastName>\
        <MiddleName />\
        <SuffixName/>\
        </NAME>\
        </INDIVIDUAL>\
        <ROLES>\
        <ROLE>\
        <ROLE_DETAIL>\
        <PartyRoleType>Borrower</PartyRoleType>\
        </ROLE_DETAIL>\
        </ROLE>\
        </ROLES>\
        <TAXPAYER_IDENTIFIERS>\
        <TAXPAYER_IDENTIFIER>\
        <TaxpayerIdentifierType>SocialSecurityNumber</TaxpayerIdentifierType>\
        <TaxpayerIdentifierValue>{ssn}</TaxpayerIdentifierValue>\
        </TAXPAYER_IDENTIFIER>\
        </TAXPAYER_IDENTIFIERS>\
        </PARTY>\
        </PARTIES>\
        <RELATIONSHIPS>\
        <!--  Link the Party (the borrower) to the Service (credit order)  -->\
        <RELATIONSHIP p2:arcrole="urn:fdc:Meridianlink.com:2017:mortgage/PARTY_IsVerifiedBy_SERVICE" p2:from="Party1" p2:to="Service1"/>\
        </RELATIONSHIPS>\
        <SERVICES>\
        <SERVICE p2:label="Service1">\
        <CREDIT>\
        <CREDIT_REQUEST>\
        <CREDIT_REQUEST_DATAS>\
        <CREDIT_REQUEST_DATA>\
        <CREDIT_REPOSITORY_INCLUDED>\
        <!--  These flags should be left as true to ensure all bureau data present on the file is returned. Can be toggled to filter bureau data  -->\
        <CreditRepositoryIncludedEquifaxIndicator>true</CreditRepositoryIncludedEquifaxIndicator>\
        <CreditRepositoryIncludedExperianIndicator>true</CreditRepositoryIncludedExperianIndicator>\
        <CreditRepositoryIncludedTransUnionIndicator>true</CreditRepositoryIncludedTransUnionIndicator>\
        </CREDIT_REPOSITORY_INCLUDED>\
        <CREDIT_REQUEST_DATA_DETAIL>\
        <CreditReportRequestActionType>StatusQuery</CreditReportRequestActionType>\
        </CREDIT_REQUEST_DATA_DETAIL>\
        </CREDIT_REQUEST_DATA>\
        </CREDIT_REQUEST_DATAS>\
        </CREDIT_REQUEST>\
        </CREDIT>\
        <SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_REQUEST>\
        <SERVICE_PRODUCT_DETAIL>\
        <ServiceProductDescription>CreditOrder</ServiceProductDescription>\
        <EXTENSION>\
        <OTHER>\
        <!--  Recommend requesting only the formats you need, to minimize processing time  -->\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        <p3:PreferredResponseFormatType>Xml</p3:PreferredResponseFormatType>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        </OTHER>\
        </EXTENSION>\
        </SERVICE_PRODUCT_DETAIL>\
        </SERVICE_PRODUCT_REQUEST>\
        </SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_FULFILLMENT>\
        <SERVICE_PRODUCT_FULFILLMENT_DETAIL>\
        <VendorOrderIdentifier>{vendor_order_identifier}</VendorOrderIdentifier>\
        </SERVICE_PRODUCT_FULFILLMENT_DETAIL>\
        </SERVICE_PRODUCT_FULFILLMENT>\
        </SERVICE>\
        </SERVICES>\
        </DEAL>\
        </DEALS>\
        </DEAL_SET>\
        </DEAL_SETS>\
        </MESSAGE>'


def business_credit_score_payload_new(business_name, address, city, postal_code, state_code):
    return f'<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" xmlns:p2="http://www.w3.org/1999/xlink" xmlns:p3="inetapi/MISMO3_4_MCL_Extension.xsd" MessageType="Request">\
        <ABOUT_VERSIONS>\
        <ABOUT_VERSION>\
        <DataVersionIdentifier>201703</DataVersionIdentifier>\
        </ABOUT_VERSION>\
        </ABOUT_VERSIONS>\
        <DEAL_SETS>\
        <DEAL_SET>\
        <DEALS>\
        <DEAL>\
        <PARTIES>\
        <PARTY p2:label="Party1">\
        <LEGAL_ENTITY>\
        <LEGAL_ENTITY_DETAIL>\
        <FullName>{business_name}</FullName>\
        </LEGAL_ENTITY_DETAIL>\
        </LEGAL_ENTITY>\
        <ADDRESSES>\
        <ADDRESS>\
        <AddressLineText>{address}</AddressLineText>\
        <CityName>{city}</CityName>\
        <CountryCode>US</CountryCode>\
        <PostalCode>{postal_code}</PostalCode>\
        <StateCode>{state_code}</StateCode>\
        </ADDRESS>\
        </ADDRESSES>\
        <ROLES>\
        <ROLE>\
        <ROLE_DETAIL>\
        <PartyRoleType>Other</PartyRoleType>\
        <PartyRoleTypeAdditionalDescription>Business</PartyRoleTypeAdditionalDescription>\
        </ROLE_DETAIL>\
        </ROLE>\
        </ROLES>\
        </PARTY>\
        </PARTIES>\
        <RELATIONSHIPS>\
        <RELATIONSHIP p2:arcrole="urn:fdc:Meridianlink.com:2017:mortgage/PARTY_IsVerifiedBy_SERVICE" p2:from="Party1" p2:to="Service1"/>\
        </RELATIONSHIPS>\
        <SERVICES>\
        <SERVICE p2:label="Service1">\
        <CREDIT>\
        <CREDIT_REQUEST>\
        <CREDIT_REQUEST_DATAS>\
        <CREDIT_REQUEST_DATA>\
        <CREDIT_REQUEST_DATA_DETAIL>\
        <CreditReportRequestActionType>Submit</CreditReportRequestActionType>\
        </CREDIT_REQUEST_DATA_DETAIL>\
        <EXTENSION>\
        <OTHER>\
        <p3:BusinessCreditProduct>BusinessProfileReportWithScore</p3:BusinessCreditProduct>\
        </OTHER>\
        </EXTENSION>\
        </CREDIT_REQUEST_DATA>\
        </CREDIT_REQUEST_DATAS>\
        </CREDIT_REQUEST>\
        </CREDIT>\
        <SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_REQUEST>\
        <SERVICE_PRODUCT_DETAIL>\
        <ServiceProductDescription>BCR</ServiceProductDescription>\
        <EXTENSION>\
        <OTHER>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        <p3:PreferredResponseFormatType>Xml</p3:PreferredResponseFormatType>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        </OTHER>\
        </EXTENSION>\
        </SERVICE_PRODUCT_DETAIL>\
        </SERVICE_PRODUCT_REQUEST>\
        </SERVICE_PRODUCT>\
        </SERVICE>\
        </SERVICES>\
        </DEAL>\
        </DEALS>\
        </DEAL_SET>\
        </DEAL_SETS>\
        </MESSAGE>'


def business_credit_score_payload_retrieve(business_name, vendor_order_identifier):
    return f'<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas" xmlns:p2="http://www.w3.org/1999/xlink" xmlns:p3="inetapi/MISMO3_4_MCL_Extension.xsd" MessageType="Request">\
        <ABOUT_VERSIONS>\
        <ABOUT_VERSION>\
        <DataVersionIdentifier>201703</DataVersionIdentifier>\
        </ABOUT_VERSION>\
        </ABOUT_VERSIONS>\
        <DEAL_SETS>\
        <DEAL_SET>\
        <DEALS>\
        <DEAL>\
        <PARTIES>\
        <PARTY p2:label="Party1">\
        <LEGAL_ENTITY>\
        <LEGAL_ENTITY_DETAIL>\
        <FullName>{business_name}</FullName>\
        </LEGAL_ENTITY_DETAIL>\
        </LEGAL_ENTITY>\
        <ROLES>\
        <ROLE>\
        <ROLE_DETAIL>\
        <PartyRoleType>Other</PartyRoleType>\
        <PartyRoleTypeAdditionalDescription>Business</PartyRoleTypeAdditionalDescription>\
        </ROLE_DETAIL>\
        </ROLE>\
        </ROLES>\
        </PARTY>\
        </PARTIES>\
        <RELATIONSHIPS>\
        <RELATIONSHIP p2:arcrole="urn:fdc:Meridianlink.com:2017:mortgage/PARTY_IsVerifiedBy_SERVICE" p2:from="Party1" p2:to="Service1"/>\
        </RELATIONSHIPS>\
        <SERVICES>\
        <SERVICE p2:label="Service1">\
        <CREDIT>\
        <CREDIT_REQUEST>\
        <CREDIT_REQUEST_DATAS>\
        <CREDIT_REQUEST_DATA>\
        <CREDIT_REQUEST_DATA_DETAIL>\
        <CreditReportRequestActionType>StatusQuery</CreditReportRequestActionType>\
        </CREDIT_REQUEST_DATA_DETAIL>\
        </CREDIT_REQUEST_DATA>\
        </CREDIT_REQUEST_DATAS>\
        </CREDIT_REQUEST>\
        </CREDIT>\
        <SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_REQUEST>\
        <SERVICE_PRODUCT_DETAIL>\
        <ServiceProductDescription>BCR</ServiceProductDescription>\
        <EXTENSION>\
        <OTHER>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        <p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        <p3:PreferredResponseFormatType>Html</p3:PreferredResponseFormatType>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT_DETAIL>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMAT>\
        </p3:SERVICE_PREFERRED_RESPONSE_FORMATS>\
        </OTHER>\
        </EXTENSION>\
        </SERVICE_PRODUCT_DETAIL>\
        </SERVICE_PRODUCT_REQUEST>\
        </SERVICE_PRODUCT>\
        <SERVICE_PRODUCT_FULFILLMENT>\
        <SERVICE_PRODUCT_FULFILLMENT_DETAIL>\
        <VendorOrderIdentifier>{vendor_order_identifier}</VendorOrderIdentifier>\
        </SERVICE_PRODUCT_FULFILLMENT_DETAIL>\
        </SERVICE_PRODUCT_FULFILLMENT>\
        </SERVICE>\
        </SERVICES>\
        </DEAL>\
        </DEALS>\
        </DEAL_SET>\
        </DEAL_SETS>\
        </MESSAGE>'
