using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoeboxClient.Models
{
    public class Capture
    {
        public Guid Id { get; set; }
        public DateTime Captured { get; set; }
        public Guid UserId { get; set; }
        public DocType DocType { get; set; }
        public UploadStatus UploadStatus { get; set; }
        public byte[] Image { get; set; }
    }
}
