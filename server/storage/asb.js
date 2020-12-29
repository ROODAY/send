const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');
const fs = require('fs');

class AzureBlobStorage {
  constructor(config, log) {
    this.log = log;

    const account = config.asb_account;
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      config.asb_accountKey
    );
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );
    this.containerClient = blobServiceClient.getContainerClient(
      config.asb_containerName
    );
  }

  async length(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    const result = blobClient.getProperties();
    return Number(result.contentLength);
  }

  async getStream(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    const result = await blobClient.download(0);
    return result.readableStreamBody;
  }

  set(id, file) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    const { size } = fs.statSync(file);
    return blobClient.upload(file, size);
  }

  del(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    return blobClient.delete({ deleteSnapshots: 'include' });
  }

  ping() {
    return this.containerClient.exists();
  }
}

module.exports = AzureBlobStorage;
