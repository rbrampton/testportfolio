import json
import boto3
import io
import zipfile
import mimetypes
import datetime

def lambda_handler(event, context):
    print("in lambda_handler")
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:ca-central-1:548331012494:ResBuiildEmail')

    location = {
        "bucketName": "resumebuild.vrfuture.com",
        "objectKey": "BuildResume.zip"
    }

    try:
        job = event.get("CodePipeline.job")
        print("Job is:", job)
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "BuildArtifact":
                    location = artifact["location"]["s3Location"]
                    print("location from pipeline build output: ", location)

        print("location being processed" + str(location))
        print("starting s3 processing")
        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('resume.vrfuture.com')
        build_bucket = s3.Bucket(location["bucketName"])
        portfolio_zip = io.BytesIO()

        print("downloading zip file:", location["objectKey"])
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)

        print("downloading files")
        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj=myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj,nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
                print(nm)

        print("done with processing. sending notification")
        currentDT = datetime.datetime.now()
        topic.publish(Subject='Deployment done', Message='ResumeBuild deployed @' + str(currentDT))

        print("sent notification")
        if job:
            print("job id:" + job["id"])
            codepipeline = boto3.client("codepipeline")
            print("sending codepipeline success result")
            codepipeline.put_job_success_result(jobId=job["id"])
            print("sent codepipeline success result")
    except:
        print("error occurred in lambda. sending notification")
        currentDT = datetime.datetime.now()
        topic.publish(Subject='Deployment failed', Message='ResumeBuild failed @' + str(currentDT))
        raise

    return 'success'
