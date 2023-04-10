import React, { useCallback, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { read, utils } from 'xlsx';

const DemoA: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onChange: UploadProps['onChange'] = useCallback(
        async (info: Parameters<Exclude<UploadProps['onChange'], undefined>>[number]) => {
            const file = info.file as any as File;
            if (!file) {
                return;
            }
            const buffer = await file.arrayBuffer();
            const wb = read(buffer);
            const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            console.log(data);
        },
        [],
    );
    return (
        <div className='demo-a'>
            <Upload
                onRemove={file => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    setFileList(newFileList);
                }}
                beforeUpload={file => {
                    setFileList([...fileList, file]);

                    return false;
                }}
                onChange={onChange}
            >
                <Button icon={<UploadOutlined />}>Click to Upload{fileList.length}</Button>
            </Upload>
        </div>
    );
};

export default DemoA;
