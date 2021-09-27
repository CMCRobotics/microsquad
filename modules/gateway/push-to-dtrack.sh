curl -X 'POST' 'https://dtrack.web.cern.ch/api/v1/bom' -H 'Content-Type: multipart/form-data' -H 'X-Api-Key: $DTRACK_API_KEY' -F 'project=$DTRACK_PROJECT_ID' -F 'bom=@sbom.xml'
