'use client';

import { Suspense, cache, useEffect, useState } from 'react'
import { dt } from '@/lib/date'

import classNames from 'classnames'
import Spinner from '@/components/spinner'
import DownloadCsv from './download-csv'
import { createClient } from '@/lib/supabase-auth-client'
import { Order, OrderItem } from '@/types/orders';
import { Attachment, Event } from '@/types/events';
import { PlusIcon, SettingIcon, TrashIcon } from '@/app/components/icons';
import AttachmentDialog from './attachment-dialog';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

type Props = {
  className?: string;
  //attachments: Attachment[] | undefined;
  event: Event;
  //onChange(event_id: string, attachments: Attachment[]): void;
}

interface State {
  attachments: Attachment[];
  isDialogOpen: boolean;
  selectedAttachment: Attachment | undefined;
}

//const supabase = createClient();



export default function AttachmentsList({ event, className }: Props) {
  const supabase = createClientComponentClient<Database>();

  const fetchAttachments = cache(async (event_id: string) => {
    const { data } = await supabase
      .from('attachments')
      .select()
      .eq('event_id', event_id)
      .returns<Attachment[]>();

    return data ?? [];
  });

  const deleteAttachment = async (attachment: Attachment) => {
    const { data, error } = await supabase
      .from('attachments')
      .delete()
      .eq('id', attachment.id);

    if (error) {
      throw new Error(`Errore inatteso: ${error.code}`);
    }

    return data;
  };

  const [state, setState] = useState<State>({
    attachments: [],
    isDialogOpen: false,
    selectedAttachment: undefined
  });

  useEffect(() => {
    fetchAttachments(event.id)
      .then(attachments => setState(state => ({ ...state, attachments })))
      .catch(() => setState(state => ({ ...state, attachments: [] })))
  }, [event, fetchAttachments]);

  const onCreate = () => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: undefined })
  }

  const onUpdate = (attachment: Attachment) => {
    setState({ ...state, isDialogOpen: true, selectedAttachment: attachment })
  }

  const onDelete = (attachment: Attachment) => {
    try {
      deleteAttachment(attachment);

      const newAttachments = state.attachments.filter(item => item.id !== attachment.id);
      setState({ ...state, attachments: newAttachments });
    } catch (e: any) {

    }
  }

  const onDialogResult = (attachment: Attachment) => {
    const index = state.attachments.findIndex(item => item.id === attachment.id);
    let newAttachments;

    if (index === -1) {
      newAttachments = [...state.attachments, attachment];
    } else {
      newAttachments = state.attachments.map(item => {
        if (item.id === attachment.id) {
          return attachment;
        }
        return item;
      });
    }
    setState({ ...state, isDialogOpen: false, selectedAttachment: undefined, attachments: newAttachments });
  }

  const closeDialog = () => {
    setState({ ...state, isDialogOpen: false, selectedAttachment: undefined })
  }

  return (
    <Suspense fallback={<Spinner />}>
      {state.isDialogOpen && <AttachmentDialog attachment={state.selectedAttachment} event={event} onResult={onDialogResult} onClose={closeDialog} />}

      <section className={classNames(className, "")}>
        <div className="flex items-center space-x-4">
          <h3 className="overtitle">Allegati</h3>
          <button onClick={onCreate} className="button-icon"><PlusIcon /></button>
        </div>

        {!!state.attachments?.length &&
          <div className="mt-4">

            <table className="text-sm">
              <thead>
                <tr>
                  <td className="pr-5 border-b py-2">TIPO</td>
                  <td className="pr-10 border-b py-2">NOME</td>
                  <td className="pr-10 border-b py-2">URL</td>
                  <td className="pr-10 border-b py-2"></td>
                </tr>
              </thead>
              <tbody>
                {state.attachments.map((attachment, index) =>
                  <tr key={index} className="border-b">
                    <td className="pr-10 py-2">{attachment.type}</td>
                    <td className="pr-10 py-2 whitespace-nowrap">{attachment.name}</td>
                    <td className="pr-10 py-2">{attachment.url}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button onClick={() => onUpdate(attachment)}><SettingIcon /></button>
                        <button onClick={() => onDelete(attachment)}><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </section>
    </Suspense>
  )
}
